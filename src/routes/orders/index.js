import { Router } from 'express'
import OrderController from '../../controllers/OrderController.js'

const router = Router()

router.post('/orders', OrderController.create)
router.get('/orders', OrderController.getOrdersByDate)
router.get('/orders/:orderId', OrderController.getById)

export default router
