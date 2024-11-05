import { Router } from 'express'
import ProductController from '../../controllers/ProductController.js'

const router = Router()

router.post('/products', ProductController.create)
router.get('/products', ProductController.getAll)
router.get('/products/:productId', ProductController.getById)
router.patch('/products/:productId', ProductController.updateById)
router.delete('/products/:productId', ProductController.deleteById)

export default router
