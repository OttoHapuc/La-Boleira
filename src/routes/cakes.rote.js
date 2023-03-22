import { Router } from "express";
import { postCake } from "../controller/cakes.controller.js";
import { validationSchema } from '..//middleware/validationSchema.js'
import { cakeSchema } from '../schemas/cake.schema.js'

const cake = Router();

cake.post('/cakes', validationSchema(cakeSchema), postCake);

export default cake;