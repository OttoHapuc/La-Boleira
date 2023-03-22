import { Router } from 'express';
import { getOrders, getOrdersById, postOrder } from '../controller/order.controller.js';
import {validationSchema} from '../middleware/validationSchema.js';
import {ordersSchema} from '../schemas/order.schema.js'

const order = Router();

order.post('/order', validationSchema(ordersSchema),postOrder);
order.get('/orders', getOrders);
order.get('/orders/:id', getOrdersById);

export default order;