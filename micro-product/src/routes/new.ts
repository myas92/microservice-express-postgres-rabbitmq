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

        let x = await new ProductCreatedPublisher(rabbitWrapper.channel, rabbitWrapper.queue).publish(
            product
        )

        console.log("***************************", x)

        res.status(201).send(result)
    } catch (error) {
        console.log(error);
    }

    // const product = await productRepo
    // await product.save();
    // await new TicketCreatedPublisher(rabbitWrapper.client).publish({
    //     id: product.id,
    //     title: product.title,
    //     price: product.price,
    //     userId: product.userId
    // })

})


export { router as newProductRouter } 