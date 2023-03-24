import { Router } from 'express';
import { getClient, postClient } from '../controller/client.controller.js';
import clientsSchema from '../schemas/client.schema.js';

const client = Router();

client.post('/clients', clientsSchema, postClient);
client.get('/clients/:id/orders', getClient);

export default client;