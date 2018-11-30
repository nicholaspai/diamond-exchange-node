import express from 'express'
import Order from '../models/orderModel'
import displayMissingParams from '../middleware/displayMissingParams'
const ordersRouter = express.Router()

ordersRouter.route('/')
    .get((req, res) => {
        Order.find({}, (err, orders) => {
            res.json(orders)
        })
    })
    .post((req, res) => {
        let required = ['market', 'direction', 'price', 'amount']
        if (displayMissingParams(req, res, required)) return;

        let order = new Order({
            market: req.body.market,
            direction: req.body.direction,
            price: req.body.price,
            amount: req.body.amount,
        })
        order.save()
        res.status(201).send(order)
    })
ordersRouter.route('/:bookId')
    .get((req, res) => {
        Order.findById(req.params.orderId, (err, order) => {
            res.json(order)
        })
    })

export default ordersRouter