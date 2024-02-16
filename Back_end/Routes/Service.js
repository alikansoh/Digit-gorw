import express from 'express';
import * as serviceController from '../Controllers/Service.js';
import passportSetup from '../Middlewares/Oauth.js';
import { requireAuth } from '../Middlewares/Jwt.js'
const router = express.Router();
const { isAuthenticated } = passportSetup();

router.post('/', requireAuth, serviceController.createservice);
router.get('/', serviceController.getServices);
router.get('/:id', isAuthenticated, serviceController.getService);
router.put('/:id', requireAuth, serviceController.updateservice);
router.delete('/:id', requireAuth, serviceController.deleteservice);

export default router;
