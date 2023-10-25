import { config } from 'dotenv';
import express from "express";
import 'express-async-errors'
import morgan from "morgan";
import { json } from "body-parser";

import { indexProductRouter } from './routes/index';
import { newProductRouter } from "./routes/new";
import { showProductRouter } from './routes/show';
import { updateProductRouter } from './routes/update';

import { errorHandler, NotFoundError } from "@myaszehn/common-package";

const app = express();
app.use(json());


app.use(morgan("tiny"));

app.use(indexProductRouter);
app.use(newProductRouter);
app.use(showProductRouter);
app.use(updateProductRouter);


app.all('*', async () => {
    throw new NotFoundError()
})

app.use(errorHandler);


export { app }