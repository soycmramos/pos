import OrderModel from '../models/OrderModel.js'
export default class OrderController {
	static create = async (req, res) => {
		const { _idCustomer, products } = req.body
		const result = await OrderModel.create({ _idCustomer, products })
		return res
			.status(result.code)
			.json(result)
	}

	static getAll = async (req, res) => {
		const result = await OrderModel.getAll()
		return res
			.status(result.code)
			.json(result)
	}
}
