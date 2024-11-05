import { StatusCodes } from 'http-status-codes'
import OrderModel from '../models/OrderModel.js'
import OrderProductModel from '../models/OrderProductModel.js'
export default class OrderController {
	static create = async (req, res) => {
		const { customerId, products } = req.body
		const newOrder = await OrderModel.create({ customerId })
		const newOrderProduct = await OrderProductModel.create({ orderId: newOrder.id, products })
		return res
			.status(StatusCodes.CREATED)
			.json({ newOrder, newOrderProduct })
	}

	static getAll = async (req, res) => {
		const result = await OrderModel.getAll()
		return res
			.status(result.code)
			.json(result)
	}

	static getById = async (req, res) => {
		const { orderId } = req.params
		const result = await OrderModel.getById({ orderId })
		return res
			.status(result.code)
			.json(result)
	}

	static update = async (req, res) => {
		const { orderId } = req.params
		const { products } = req.body
		const result = await OrderProductModel.update({ orderId, products })
		return res
			.status(result.code)
			.json(result)
	}
}
