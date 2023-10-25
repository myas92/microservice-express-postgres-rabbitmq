import express, { Request, Response } from 'express'
const router = express.Router();


router.get('/api/orders', async (req: Request, res: Response) => {

    const orders = "find all orders"
    res.status(200).send(orders)
})


export { router as indexOrderRouter }