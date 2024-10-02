import { randomUUID } from 'node:crypto'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import OrderProductModel from '../models/OrderProductModel.js'
import Order from '../database/models/Order.js'
export default class OrderModel {
	static create = async ({ _idCustomer, products }) => {
		try {
			const _idOrder = randomUUID()

			const newOrder = await Order.create({ _id: _idOrder, _idCustomer })
			const newOrderProduct = await OrderProductModel.create({ _idOrder, products })

			return ({
				status: 'success',
				title: ReasonPhrases.CREATED,
				code: StatusCodes.CREATED,
				data: { newOrder, newOrderProduct }
			})
		} catch (error) {
			console.error(error)
			return ({
				status: 'failure',
				title: ReasonPhrases.INTERNAL_SERVER_ERROR,
				code: StatusCodes.INTERNAL_SERVER_ERROR,
				errros: [
					{
						code: StatusCodes.INTERNAL_SERVER_ERROR,
						message: 'Something went wrong'
					}
				]
			})
		}
	}

	static getAll = async () => {
		const errors = []

		try {
			const result = await Order.findAll()

			if (!result.length > 0) {
				const code = 404
				const message = 'No orders found'
				errors.push({ code, message })
				return ({
					status: 'failure',
					title: ReasonPhrases.NOT_FOUND,
					code: StatusCodes.NOT_FOUND,
					errors
				})
			}

			return ({
				status: 'success',
				title: ReasonPhrases.OK,
				code: StatusCodes.OK,
				data: result
			})
		} catch (error) {
			console.error(error)
			return ({
				status: 'failure',
				title: ReasonPhrases.INTERNAL_SERVER_ERROR,
				code: StatusCodes.INTERNAL_SERVER_ERROR,
				errros: [
					{
						code: StatusCodes.INTERNAL_SERVER_ERROR,
						message: 'Something went wrong'
					}
				]
			})
		}
	}
}
