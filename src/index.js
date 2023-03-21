import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use([]);

app.listen(process.env.PORT || 500, () =>
    console.log(`port: ${provess.env.PORT}`)
);