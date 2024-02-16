import express from 'express';
import * as Package from '../Controllers/Package.js';
import { requireAuth } from '../Middlewares/Jwt.js';
const router = express.Router();

router.get('/', Package.getPackages);
router.get('/:id', Package.getPackage);
router.post('/',requireAuth, Package.createPackage)
router.put('/:id',requireAuth, Package.updatePackage);
router.delete('/:id',requireAuth, Package.deletePackage);

export default router;