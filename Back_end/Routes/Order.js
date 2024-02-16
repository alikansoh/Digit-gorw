import express from 'express';
import * as Order from '../Controllers/Order.js';
import { requireAuth } from '../Middlewares/Jwt.js'
const router = express.Router();

router.get('/', Order.getOrders);
router.get('/:id', Order.getOrder);
router.post('/', Order.createOrder)
router.put('/:id',requireAuth, Order.updateOrder);
router.delete('/:id', requireAuth,Order.deleteOrder);

export default router;