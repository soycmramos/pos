import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { validateOrderProductSchema } from '../schemas/orderProductSchema.js'
import OrderModel from '../models/OrderModel.js'
import OrderProductModel from '../models/OrderProductModel.js'
import info from './../utils/info.js'

export default class OrderController {
	static create = async (req, res) => {
		const { customerId } = req.body

		const validation = validateOrderProductSchema(req.body)

		if (!validation.success) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({
					infO: info(),
					status: 'failure',
					title: ReasonPhrases.BAD_REQUEST,
					code: StatusCodes.BAD_REQUEST,
					errors: JSON.parse(validation.error.message)
				})
		}

		const newOrder = await OrderModel.create({ customerId })
		await OrderProductModel.create({ orderId: newOrder.id, products: validation.data.products })
		return res
			.status(StatusCodes.CREATED)
			.json({ info: info(), newOrder })
	}

	static getOrdersByDate = async (req, res) => {
		const { startDate, endDate } = req.query

		const result = await OrderModel.getOrdersByDate({ startDate, endDate })

		console.log({ startDate, endDate })

		return res
			.status(result.code)
			.json({ info: info(), ...result })
	}

	static getById = async (req, res) => {
		const { orderId } = req.params
		const result = await OrderModel.getById({ orderId })
		return res
			.status(result.code)
			.json({ info: info(), ...result })
	}

	static update = async (req, res) => {
		const { orderId } = req.params
		const { products } = req.body
		const result = await OrderProductModel.update({ orderId, products })
		return res
			.status(result.code)
			.json({ info: info(), ...result })
	}
}
