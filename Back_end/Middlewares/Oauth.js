import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../Models/User.js';
import dotenv from 'dotenv';

dotenv.config();

// Middleware to check if user is authenticated
export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    // If user is authenticated, proceed to the next middleware
    return next();
  } else {
    // If user is not authenticated, redirect to login page or return an error
    res.redirect('/login'); // You can customize this redirect URL as needed
  }
};

const passportSetup = () => {
  // Serialize and deserialize user functions...
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
      done(null, user);
    });
  });

  // Local Strategy for username and password authentication
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user || !(await user.isValidPassword(password))) {
          return done(null, false, { message: 'Invalid email or password' });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );

  // Google OAuth Strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log('Access Token:', accessToken); 

          let user = await User.findOne({ googleId: profile.id });

          if (!user) {
            user = await User.create({
              googleId: profile.id,
              email: profile.emails[0].value,
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
              username: profile.emails[0].value.split('@')[0],
              balance:  0,
              phone: '',
            });
          }

          return done(null, user);
        } catch (error) {
          return done(error, null);
        }
      }
    )
  );

  const initializePassport = passport.initialize();
  const sessionPassport = passport.session();

  return {
    isAuthenticated,
    initialize: function(req, res, next) {
      initializePassport(req, res, next);
    },
    session: function(req, res, next) {
      sessionPassport(req, res, next);
    }
  };
};

export default passportSetup;
