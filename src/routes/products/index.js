import { Router } from 'express'
import ProductController from '../../controllers/ProductController.js'

const router = Router()

router.put('/products', ProductController.create)
router.get('/products', ProductController.getAll)
router.get('/products/:idProduct', ProductController.getById)
router.patch('/products/:idProduct', ProductController.updateById)
router.delete('/products/:idProduct', ProductController.deleteById)

export default router
