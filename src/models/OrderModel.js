import { randomUUID } from 'node:crypto'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import OrderProductModel from '../models/OrderProductModel.js'
import Order from '../database/models/Order.js'
export default class OrderModel {
	static create = async ({ customerId }) => {
		try {
			const orderId = randomUUID()
			return await Order.create({ id: orderId, customerId })
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

	static getById = async ({ orderId }) => {
		const errors = []

		let result = await Order.findOne({ where: { id: orderId } })

		if (!result) {
			const code = StatusCodes.NOT_FOUND
			const message = 'Order not found'
			errors.push({ code, message })
			return ({
				status: 'failure',
				title: ReasonPhrases.NOT_FOUND,
				code,
				errors
			})
		}

		result = OrderProductModel.getById({ orderId })

		return ({
			status: 'success',
			title: ReasonPhrases.OK,
			code: StatusCodes.OK,
			data: result
		})
	}

	static update = async ({ orderId, customerId, amount }) => {
		const errors = []

		try {
			const result = await OrderProductModel.update({ amount })

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
