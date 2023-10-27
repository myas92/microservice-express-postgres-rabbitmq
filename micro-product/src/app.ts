import { config } from 'dotenv';
import express from "express";
import 'express-async-errors'
import morgan from "morgan";
import { json } from "body-parser";

import { showProductsRouter } from './routes/show';
import { newProductRouter } from "./routes/new";
import { serachProductRouter } from "./routes/search";


import { errorHandler, NotFoundError } from "@myaszehn/common-package";

const app = express();
app.use(json());


app.use(morgan("tiny"));

app.use(serachProductRouter);
app.use(showProductsRouter);
app.use(newProductRouter);

app.all('*', async () => {
    throw new NotFoundError()
})

app.use(errorHandler);


export { app }