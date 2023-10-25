import { NotFoundError } from '@myaszehn/common-package';
import express, { Request, Response } from 'express'

const router = express.Router();


router.get('/api/products/:id', async (req: Request, res: Response) => {

    const product = "find product by Id"
    if (!product) {
        throw new NotFoundError()
    }
    res.send(product)
    res.status(200).send({})
})

export { router as showProductRouter }