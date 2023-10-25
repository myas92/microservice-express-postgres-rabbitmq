import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  validateRequest,
  NotFoundError,
  NotAuthorizedError,
} from '@myaszehn/common-package';
import { rabbitWrapper } from '../rabbit-wrapper';

const router = express.Router();

router.put(
  '/api/orders/:id',
  [
    body('title').not().isEmpty().withMessage('title is required'),
    body('price').isFloat({
        gt: 0
    }).withMessage('Price must be greater than 0'),
    body('description').optional(),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const ticket = "order updated"

    // if (!ticket) {
    //   throw new NotFoundError();
    // }


    // await ticket.save();
    //   id: "1",
    //   title: "ticket.title",
    //   price: 123,
    //   userId: "ticket.userId"
    // })
    res.send(ticket);
  }
);

export { router as updateOrderRouter };