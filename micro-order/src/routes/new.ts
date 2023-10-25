import express, { Request, Response } from 'express';
import { validateRequest } from '@myaszehn/common-package'
import { Order } from '../entity/order.entity';
import { db } from '../config/db';

const { body } = require('express-validator');

const router = express.Router();

router.post('/api/orders', [
    body('title').not().isEmpty().withMessage('title is required'),
    body('price').isFloat({
        gt: 0
    }).withMessage('Price must be greater than 0'),
    body('description').optional(),
], validateRequest, async (req: Request, res: Response) => {
    const { title, price, description } = req.body;
    try {
        let order = await db.getRepository(Order).create({
            title,
            price,
            description
        });  
       const result =  await db.getRepository(Order).save(order)
        res.status(201).send(result)
    } catch (error) {
        console.log(error);
    }
})


export { router as newOrderRouter } 