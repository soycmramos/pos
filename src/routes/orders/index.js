import { Router } from 'express'
import OrderController from '../../controllers/OrderController.js'

const router = Router()

router.put('/orders', OrderController.create)
router.get('/orders', OrderController.getAll)

export default router
