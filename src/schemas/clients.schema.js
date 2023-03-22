import joi from 'joi';

export const clientsSchema = joi.object({
    name: joi.string().required(),
    address: joi.string().required(),
    phone: joi.string().max(14).required()
})