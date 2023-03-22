import joi from 'joi';

export const ordersSchema = joi.object({
    clientId: joi.number().required(),
    cakeId: joi.number().required(),
    quantity: joi.number().required(),
    totalPrice: joi.number().required()
})