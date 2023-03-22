import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cake from './routes/cakes.rote.js';
import order from './routes/order.rote.js';
import client from './routes/client.rote.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use([client, order, cake]);

app.listen(process.env.PORT || 500, () =>
    console.log(`port: ${process.env.PORT}`)
);