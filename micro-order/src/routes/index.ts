import express, { Request, Response } from 'express'
import { db } from '../config/db';
import { Order } from '../entity/order.entity';
const router = express.Router();


router.get('/api/orders', async (req: Request, res: Response) => {
    const foundedOrders = await db.getRepository(Order).find()
    // const foundedOrders = await db.getRepository(Order).createQueryBuilder("order")
    // .leftJoinAndSelect("order.product", "op")
    // .getMany()
    res.status(200).send(foundedOrders)
})


export { router as indexOrderRouter }