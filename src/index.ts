import "reflect-metadata";
import * as dotenv from "dotenv";
dotenv.config();



import express from 'express';
import cors from 'cors';
import {createConnection} from 'typeorm';

import router from './routes/routes';

const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use(router); 

createConnection().then(() => {
    app.listen(process.env.PORT);
    console.log('Server on port', process.env.PORT);
});

