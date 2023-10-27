import { BadRequestError } from '@myaszehn/common-package';
import express, { Request, Response } from 'express'
import { db } from '../config/db';
import { Product } from '../entity/product.entity';
const router = express.Router();


router.get('/api/products', async (req: Request, res: Response) => {
    try {
        const foundedOrders = await db.getRepository(Product).find()
        res.status(200).send(foundedOrders)
    } catch (error) {
        throw new BadRequestError('Something went wrong')
    }
})


export { router as showProductsRouter }