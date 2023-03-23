import {db} from '../config/db.js';

export async function postClient(req,res){
    const {name, address, phone} = req.body;
    if (name.length === 0 || 
        address.length === 0 || 
        phone.length <10 ||
        phone.length >11 ||
        phone.length === 0
        ) return res.sendStatus(400);
    try {
        await db.query(`
        INSERT INTO "clients"(name,addres,phone)
        VALUES ($1,$2,$3)
        `,[name,address, phone]);
    } catch (error) {
        res.status(500).send(error.message);
    }
    return res.status(201).send('OK');
}

export async function getClient(req,res){
    const {id} = req.params;
    try {
        const clientIdExist = await db.query(`
        SELECT "clients"."id" 
        FROM "clients"
        WHERE  "clients"."id" = $1
        `,[id]);
        if (clientIdExist.rowCount === 0) return res.sendStatus(404);
        const clientOrders = await db.query(`
        SELECT
            "clients"."id"                              AS "clientId",
            "clients"."name"                            AS "clientName",
            "clients"."addres",
            "clients"."phone",
            "cakes"."id"                                AS "cakeId",
            "cakes"."name"                              AS "cakeName",
            "cakes"."price",
            "cakes"."description",
            "cakes"."image",
            "orders"."id"                               AS "orderId",
            "orders"."createdAt"                        AS "createdAt",
            "orders"."quantity"                         AS "quantity",
            "orders"."totalPrice"                       AS "totalPrice"
        FROM "orders"
        INNER JOIN "clients" 
        ON "orders"."clientId" = "clients"."id"
        INNER JOIN "cakes"
        ON "orders"."cakeId" = "cakes"."id"
        WHERE "orders"."clientId" = $1
        ORDER BY "createdAt" ASC;
        `, [id]);
        const formattedResult = clientOrders.rows.map(item => {
            const client ={
                id: item.clientId,
                name: item.clientName,
                address: item.addres,
                phone: item.phone
            };
            const cake = {
                id: item.cakeId,
                name: item.cakeName,
                price: item.price,
                image: item.image,
                description: item.description
            };
            return {
                client: client,
                cake: cake,
                orderId: item.orderId,
                quantity: item.quantity,
                totalPrice: item.totalPrice,
                createdAt: item.createdAt
            };
        });
        return res.send(formattedResult);
    } catch (error) {
        res.status(500).send(error.message);
    }
}