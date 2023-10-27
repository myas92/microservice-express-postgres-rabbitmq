import { BadRequestError } from '@myaszehn/common-package';
import express, { Request, Response } from 'express'
import { Like } from 'typeorm';
import { db } from '../config/db';
import { Product } from '../entity/product.entity';
const router = express.Router();


router.get('/api/products/search', async (req: Request, res: Response) => {
    try {
        const { title } = req.query
        const foundedOrders = await db.getRepository(Product).find({
            where: {
                title: Like(`%${title}%`)
            }
        });
        res.status(200).send(foundedOrders)
    } catch (error) {
        throw new BadRequestError('Something went wrong')
    }
})


export { router as serachProductRouter }