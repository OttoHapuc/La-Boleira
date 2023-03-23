import joi from "joi";

export const cakeSchema = joi.object({
    name: joi.string(),
    price: joi.number(),
    image: joi.string().uri().required(),
    description: joi.string()
})