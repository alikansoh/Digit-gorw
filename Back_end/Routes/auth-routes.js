import express from 'express';
import passport from 'passport';

const router = express.Router();
router.post('/login', passport.authenticate('local'), (req, res) => {

  res.json({ message: 'Login successful', user: req.user });
});
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// Route for logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/login'); // Redirect to the login page after logout
  });
});

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/api/package'); 
});

export default router;
