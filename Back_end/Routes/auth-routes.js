import express from 'express';
import passport from 'passport';

const router = express.Router();

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

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
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  res.json({ message: 'Login successful', user: req.user });

  res.redirect('/');
});

export default router;
