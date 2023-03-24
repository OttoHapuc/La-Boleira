import { Router } from "express";
import { postCake } from "../controller/cakes.controller.js";
import cakeSchema from "../schemas/cake.schema.js";


const cake = Router();

cake.post('/cakes', cakeSchema, postCake);

export default cake;