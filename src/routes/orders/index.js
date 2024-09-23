import { randomUUID } from 'node:crypto'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import { Router } from 'express'
import Order from '../../database/models/Order.js'

const router = Router()

router.put('/orders', async (req, res) => {
	const _id = randomUUID()
	const errors = []

	try {
		let result = await Order.findOne({ where: { _id } })

		if (result instanceof Order) {
			const code = 409
			const detail = `Order with _id ${result._id} already exists`
			errors.push({ code, detail })
		}

		if (errors.length) {
			return res
				.status(StatusCodes.CONFLICT)
				.json({
					status: 'failure',
					title: ReasonPhrases.CONFLICT,
					code: StatusCodes.CONFLICT,
					errors
				})
		}

		result = await Order.create({ _id: randomUUID() })

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
