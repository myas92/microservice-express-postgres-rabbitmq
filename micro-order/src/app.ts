import { config } from 'dotenv';
import express from "express";
import 'express-async-errors'
import morgan from "morgan";
import { json } from "body-parser";

import { indexOrderRouter } from './routes/index';
import { newOrderRouter } from "./routes/new";
import { showOrderRouter } from './routes/show';
import { updateOrderRouter } from './routes/update';

import { errorHandler, NotFoundError } from "@myaszehn/common-package";

const app = express();
app.use(json());


app.use(morgan("tiny"));

app.use(indexOrderRouter);
app.use(newOrderRouter);
app.use(showOrderRouter);
app.use(updateOrderRouter);


app.all('*', async () => {
    throw new NotFoundError()
})

app.use(errorHandler);


export { app }