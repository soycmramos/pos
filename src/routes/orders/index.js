import { Router } from 'express'
import OrderController from '../../controllers/OrderController.js'

const router = Router()

router.put('/orders', OrderController.create)
router.get('/orders/:orderId', OrderController.getById)
router.patch('/orders/:orderId', OrderController.update)

export default router
