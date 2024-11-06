import { Router } from 'express'
import CustomerController from '../../controllers/CustomerController.js'

const router = Router()

router.post('/customers', CustomerController.create)
router.get('/customers', CustomerController.getAll)
router.get('/customers/:customerId', CustomerController.getById)
router.patch('/customers/:customerId', CustomerController.updateById)
router.delete('/customers/:customerId', CustomerController.deleteById)

export default router
