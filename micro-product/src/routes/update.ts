import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  validateRequest,
  NotFoundError,
  NotAuthorizedError,
} from '@myaszehn/common-package';
import { ProductUpdatedPublisher } from '../events/product-updated-publisher';
import { rabbitWrapper } from '../rabbit-wrapper';

const router = express.Router();

router.put(
  '/api/products/:id',
  [
    body('title').not().isEmpty().withMessage('title is required'),
    body('price').isFloat({
        gt: 0
    }).withMessage('Price must be greater than 0'),
    body('description').optional(),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const ticket = "product updated"

    // if (!ticket) {
    //   throw new NotFoundError();
    // }


    // await ticket.save();
    // await new TicketUpdatedPublisher(rabbitWrapper.client).publish({
    //   id: "1",
    //   title: "ticket.title",
    //   price: 123,
    //   userId: "ticket.userId"
    // })
    res.send(ticket);
  }
);

export { router as updateProductRouter };