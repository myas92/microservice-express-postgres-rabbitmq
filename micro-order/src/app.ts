import express from "express";
import 'express-async-errors'
import morgan from "morgan";
import { json } from "body-parser";

import { showOrdersRouter } from './routes/show';
import { newOrderRouter } from "./routes/new";

import { errorHandler, NotFoundError } from "@myaszehn/common-package";

const app = express();
app.use(json());


app.use(morgan("tiny"));

app.use(showOrdersRouter);
app.use(newOrderRouter);


app.all('*', async () => {
    throw new NotFoundError()
})

app.use(errorHandler);


export { app }