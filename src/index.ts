import "reflect-metadata";

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
    app.listen(3000);
    console.log('Server on port', 3000);
});

