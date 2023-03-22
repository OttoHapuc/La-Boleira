import { Router } from 'express';
import { getClient, postClient } from '../controller/client.controller.js';
import { validationSchema } from '../middleware/validationSchema.js'
import { clientsSchema } from '../schemas/clients.schema.js'

const client = Router();

client.post('/clients', validationSchema(clientsSchema), postClient);
client.get('/clients/:id/orders', getClient);

export default client;