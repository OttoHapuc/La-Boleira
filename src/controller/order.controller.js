import {db} from '../config/db.js';

export async function postOrder(req,res){
    const {clientId, cakeId, quantity, totalPrice} = req.body;
    try {
        const clientIdExist = await db.query(`
        SELECT "clients"."id" 
        FROM "clients"
        WHERE  "clients"."id" = $1
        `,[clientId]);
        if (clientIdExist.rowCount === 0) return res.sendStatus(404);
        const cakedExist = await db.query(`
        SELECT "cakes"."id" 
        FROM "cakes"
        WHERE  "cakes"."id" = $1
        `,[cakeId]);
        if (cakedExist.rowCount === 0) return res.sendStatus(404);
        console.log(quantity)
        if (Number(quantity)    <= 0 || Number(quantity) > 5) return res.status(400).send("quantity >0 || <5 please!!!");
        await db.query(`
        INSERT INTO "orders"("clientId", "cakeId", "quantity", "totalPrice")
        VALUES ($1, $2, $3, $4)
        `,[clientId, cakeId,quantity,totalPrice]);
    } catch (error) {
        res.status(500).send(error.message);
    }
    return res.status(201).send('OK');
}
export async function getOrders(req,res){
    try {
        const orders = await db.query(`
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
        ORDER BY "createdAt" DESC;
        `);
        if (orders.rowCount === 0) return res.sendStatus(404);
        const formattedResult = orders.rows.map(item => {
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
        if(req?.query.data) {
            const orderByDate = formattedResult.filter( item => {
                item.createdAt.toISOString().startsWith(req.query.data)
            });
            return res.send(orderByDate)
        };
        return res.send(formattedResult);
    } catch (error) {
        res.status(500).send(error.message);
    }
}
export async function getOrdersById(req,res){
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
        ORDER BY "createdAt" DESC;
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