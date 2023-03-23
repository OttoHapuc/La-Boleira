import { Router } from 'express';
import { getClient, postClient } from '../controller/client.controller.js';

const client = Router();

client.post('/clients', postClient);
client.get('/clients/:id/orders', getClient);

export default client;