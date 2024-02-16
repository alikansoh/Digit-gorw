import express from 'express';
import * as Admin from '../Controllers/Admin.js';
import { requireAuth } from '../Middlewares/Jwt.js'

const router = express.Router();

// Public routes
router.post('/register', Admin.register);
router.post('/login', Admin.login);

// Protected routes (require authentication)
// router.use(requireAuth);
router.get('/',requireAuth, Admin.getAdmins);
router.get('/:id',requireAuth, Admin.getAdmin);
router.put('/:id',requireAuth, Admin.updateAdmin);
router.delete('/:id',requireAuth, Admin.deleteAdmin);

export default router;