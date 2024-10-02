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
}
