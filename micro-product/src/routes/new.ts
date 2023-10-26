import { rabbitWrapper } from '../rabbit-wrapper';
import express, { Request, Response } from 'express';
import { validateRequest } from '@myaszehn/common-package'
import { ProductCreatedPublisher } from '../events/product-created-publisher';
import { Product } from '../entity/product.entity';
import { db } from '../config/db';

const { body } = require('express-validator');

const router = express.Router();

router.post('/api/products', [
    body('title').not().isEmpty().withMessage('title is required'),
    body('price').isFloat({
        gt: 0
    }).withMessage('Price must be greater than 0'),
    body('description').optional(),
], validateRequest, async (req: Request, res: Response) => {
    const { title, price, description } = req.body;
    try {
        let product = await db.getRepository(Product).create({
            title,
            price,
            description
        });
        const result = await db.getRepository(Product).save(product)

        let x = await new ProductCreatedPublisher(rabbitWrapper.channel, rabbitWrapper.productQueue).publish(
            result
        )
        res.status(201).send(result)
    } catch (error) {
        console.log(error);
    }
})


export { router as newProductRouter } 