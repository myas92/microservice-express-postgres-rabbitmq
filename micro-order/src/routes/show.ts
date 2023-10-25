import { NotFoundError } from '@myaszehn/common-package';
import express, { Request, Response } from 'express'

const router = express.Router();


router.get('/api/orders/:id', async (req: Request, res: Response) => {

    const order = "find order by Id"
    if (!order) {
        throw new NotFoundError()
    }
    res.send(order)
    res.status(200).send({})
})

export { router as showOrderRouter }