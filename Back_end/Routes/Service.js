import express from 'express';
import * as serviceController from '../Controllers/Service.js';
import passportSetup from '../Middlewares/Oauth.js';
import { requireAuth } from '../Middlewares/Jwt.js'
const router = express.Router();
const { isAuthenticated } = passportSetup();

router.post('/',  serviceController.createservice);
router.get('/', serviceController.getServices);
router.get('/:id', isAuthenticated, serviceController.getService);
router.patch('/:id', serviceController.updateservice);
router.delete('/:id', serviceController.deleteservice);

export default router;
