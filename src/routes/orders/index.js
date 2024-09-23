import { randomUUID } from 'node:crypto'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import { Router } from 'express'
import Order from '../../database/models/Order.js'
import OrderProduct from './../../database/models/OrderProduct.js'

const router = Router()

router.put('/orders', async (req, res) => {
	const { body: products } = req

	try {
		const idOrder = randomUUID()
		await Order.create({ _id: idOrder })

		const bulk = products.map(({ _id, amount }) => ({
			_idOrder: idOrder,
			_idProduct: _id,
			amount
		}))

		const result = await OrderProduct.bulkCreate(bulk)

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
