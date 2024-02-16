import express from 'express';
import * as UserController from '../Controllers/User.js';
import { requireAuth } from '../Middlewares/Jwt.js'

const router = express.Router();

// Public routes
router.post('/register', UserController.register);
router.post('/login', UserController.login);


router.get('/', requireAuth,UserController.getUsers);
router.get('/:id', UserController.getUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id',requireAuth, UserController.deleteUser);

export default router;
