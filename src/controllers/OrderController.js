import { StatusCodes } from 'http-status-codes'
import OrderModel from '../models/OrderModel.js'
import OrderProductModel from '../models/OrderProductModel.js'
export default class OrderController {
	static create = async (req, res) => {
		const { _idCustomer, products } = req.body
		const newOrder = await OrderModel.create({ _idCustomer })
		const newOrderProduct = await OrderProductModel.create({ _idOrder: newOrder._id, products })
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
		const { _idOrder } = req.params
		const result = await OrderModel.getById({ _idOrder })
		return res
			.status(result.code)
			.json(result)
	}

	static update = async (req, res) => {
		const { _idOrder } = req.params
		const { products } = req.body
		const result = await OrderProductModel.update({ _idOrder, products })
		return res
			.status(result.code)
			.json(result)
	}
}
