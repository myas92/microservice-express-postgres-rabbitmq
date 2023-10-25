import express, { Request, Response } from 'express'
const router = express.Router();


router.get('/api/products', async (req: Request, res: Response) => {

    const products = "find all products"
    res.status(200).send(products)
})


export { router as indexProductRouter }