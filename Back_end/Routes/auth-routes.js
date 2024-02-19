import express from 'express';
import passport from 'passport';

const router = express.Router();

router.post('/login', passport.authenticate('local'), (req, res) => {
  // Send the user data in the response
  res.json({ message: 'Login successful', user: req.user });
});

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Route for logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/login');  
  });
});

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  // Successful authentication, redirect home.
  res.json({ message: 'Login successful', user: req.user });

  res.redirect('/');
});

export default router;
