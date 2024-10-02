import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import OrderProduct from '../database/models/OrderProduct.js'

export default class OrderProductModel {
	static create = async ({ _idOrder, products }) => {
		try {
			const orderProducts = products.map(({ _id: _idProduct, amount }) => ({
				_idOrder,
				_idProduct,
				amount
			}))

			return await OrderProduct.bulkCreate(orderProducts)
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
