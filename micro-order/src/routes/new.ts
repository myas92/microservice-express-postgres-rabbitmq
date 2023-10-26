import { OrderCreatedPublisher } from './../events/order-created-publisher';
import express, { Request, Response } from 'express';
import { NotFoundError, validateRequest } from '@myaszehn/common-package'
import { Order } from '../entity/order.entity';
import { db } from '../config/db';
import { Product } from '../entity/product.entity';
import { rabbitWrapper } from '../rabbit-wrapper';
import { Connection, Repository } from "typeorm";
const { body } = require('express-validator');

const router = express.Router();

router.post('/api/orders', [
    body('productId').not().isEmpty().isFloat({
        gt: 0
    }).withMessage('productId is required'),
], validateRequest, async (req: Request, res: Response) => {
    const { productId} = req.body;
        let product = await db.getRepository(Product).findOneBy({
            id: productId
        });

        if(!product){
            throw new NotFoundError();
        }


    let order = new Order()
    order.title = product.title 
    order.price = product.price 


    const queryRunner = db.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
        await queryRunner.manager.save(order);
        await queryRunner.manager.remove(product);
        await queryRunner.commitTransaction();
    } catch (err) {
        await queryRunner.rollbackTransaction();
    } finally {
        await new OrderCreatedPublisher(rabbitWrapper.channel, rabbitWrapper.orderQueue).publish({
            productId
        }
        )
        await queryRunner.release();
    }
        res.status(201).send(order)
})


export { router as newOrderRouter } 