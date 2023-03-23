import { db } from "../config/db.js";

export async function postCake(req,res){
    const {name, price, image, description } = req.body;
    if (name.length < 2) return res.sendStatus(400);
    if (Number(price) < 1) return res.sendStatus(400);
    if (! typeof description === "string") res.sendStatus(400);
    try {
        const nameExist = await db.query(`
        SELECT "clients"."name" 
        FROM "clients"
        WHERE  "clients"."name" = $1
        `,[name]);
        if (nameExist.rowCount > 0) return res.sendStatus(409);
        await db.query(`
        INSERT INTO "cakes" ("name", "price","image", "description")
        VALUES ($1, $2, $3, $4)
        `, [name, price, image, description]);
    } catch (error) {
        res.status(500).send(error.message);
    }
    res.status(201).send("OK");
}