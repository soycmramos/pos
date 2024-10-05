import { Router } from 'express'
import OrderController from '../../controllers/OrderController.js'

const router = Router()

router.put('/orders', OrderController.create)
router.get('/orders/:_idOrder', OrderController.getById)
router.patch('/orders/:_idOrder', OrderController.update)

export default router
