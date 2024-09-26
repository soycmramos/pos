import { randomUUID } from 'node:crypto'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import { Router } from 'express'
import Order from '../../database/models/Order.js'
import OrderProduct from './../../database/models/OrderProduct.js'

const router = Router()

router.put('/orders', async (req, res) => {
	const { idCustomer, products } = req.body

	try {
		const idOrder = randomUUID()
		await Order.create({ _id: idOrder, _idCustomer: idCustomer })

		// const rows = products.map(({ _id: _idProduct, amount }) => ({
		// 	_idOrder,
		// 	_idProduct,
		// 	amount
		// }))

		// const result = await OrderProduct.bulkCreate(rows)

		return res
			.status(StatusCodes.CREATED)
			.json({
				status: 'success',
				title: ReasonPhrases.CREATED,
				code: StatusCodes.CREATED,
				data: result
			})
	} catch (error) {
		console.error(error)
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({
				status: 'failure',
				title: ReasonPhrases.INTERNAL_SERVER_ERROR,
				code: StatusCodes.INTERNAL_SERVER_ERROR,
				errros: [
					{
						code: StatusCodes.INTERNAL_SERVER_ERROR,
						detail: 'Something went wrong'
					}
				]
			})
	}
})

export default router
