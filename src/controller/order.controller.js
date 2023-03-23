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
        if (Number(quantity) > 0 && Number(quantity) < 5) return res.sendStatus(400);
    } catch (error) {
        res.status(500).send(error.message);
    }
    res.status(201).send('OK');
}
export async function getOrders(req,res){
    
    try {
        const orders = await db.query(`
        SELECT
            'clients'.'id',
            'clients'.'name',
            'clients'.'address',
            'clients'.'phone',
            'cakes'.'id',
            'cakes'.'name',
            'cakes'.'price',
            'cakes'.'description',
            'cakes'.'image',
            'orders'.'id'          AS 'orderId',
            'orders'.'createdAt'   AS 'createdAt',
            'orders'.'quantity'    AS 'quantity',
            'orders'.'totalPrice'  AS 'totalPrice',
        FROM orders
        INNER JOIN clients 
        ON 'orders'.'clientId' = 'clients'.'id'
        INNER JOIN 'cakes'
        ON 'orders'.'cakeId' = 'cakes'.'id'
        `);
        if (orders.rowCount === 0) return res.sendStatus(404);
        const formattedResult = orders.map(item => {
            const client ={
                id: item.clients.id,
                name: item.clients.name,
                address: item.clients.address,
                phone: item.clients.phone
            };
            const cake = {
                id: item.cakes.id,
                name: item.cakes.name,
                price: item.cakes.price,
                image: item.cakes.image,
                description: item.cakes.description
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
        if(req.query.date) {};
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
            'clients'.'id',
            'clients'.'name',
            'clients'.'address',
            'clients'.'phone',
            'cakes'.'id',
            'cakes'.'name',
            'cakes'.'price',
            'cakes'.'description',
            'cakes'.'image',
            'orders'.'id'          AS 'orderId',
            'orders'.'createdAt'   AS 'createdAt',
            'orders'.'quantity'    AS 'quantity',
            'orders'.'totalPrice'  AS 'totalPrice',
        FROM orders
        WHERE 'orders'.'clientId' = $1
        INNER JOIN clients 
        ON 'orders'.'clientId' = 'clients'.'id'
        INNER JOIN 'cakes'
        ON 'orders'.'cakeId' = 'cakes'.'id'
        `, [id]);
        const formattedResult = orders.map(item => {
            const client ={
                id: item.clients.id,
                name: item.clients.name,
                address: item.clients.address,
                phone: item.clients.phone
            };
            const cake = {
                id: item.cakes.id,
                name: item.cakes.name,
                price: item.cakes.price,
                image: item.cakes.image,
                description: item.cakes.description
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