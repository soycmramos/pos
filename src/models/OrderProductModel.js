import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { Sequelize, Op, literal } from 'sequelize'
import OrderProduct from '../database/models/OrderProduct.js'
import Product from '../database/models/Product.js'
import Order from '../database/models/Order.js'
export default class OrderProductModel {
	static create = async ({ _idOrder, products }) => {
		try {
			const rows = products.map(({ _id: _idProduct, amount }) => ({
				_idOrder,
				_idProduct,
				amount
			}))

			return await OrderProduct.bulkCreate(rows)
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

	static getById = async ({ _idOrder }) => {
		const errors = []

		try {
			let result = await Order.findAll({
				where: { _id: _idOrder },
				include: [
					{
						model: OrderProduct,
						include: [
							{
								model: Product,
								attributes: [
									'name',
									'price',
									[literal('OrderProduct.amount * Product.price'), 'total']
								]
							}
						],
						attributes: ['amount']
					}
				]
			})

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

	static update = async ({ _idOrder, products }) => {
		const errors = []

		let result = await OrderProduct.findOne({ where: { _idOrder } })

		if (!result) {
			const code = 404
			const message = 'Order not found'
			errors.push({ code, message })
			return ({
				status: 'failure',
				title: ReasonPhrases.NOT_FOUND,
				code: StatusCodes.NOT_FOUND,
				errors
			})
		}

		try {
			for (const product of products) {
				const { _id: _idProduct, amount } = product

				await OrderProduct.update({
					_idProduct: Sequelize.fn('IFNULL', _idProduct, Sequelize.col('_idProduct')),
					amount: Sequelize.fn('IFNULL', amount, Sequelize.col('amount'))
				}, { where: { _idOrder, _idProduct } })
			}

			const result = await OrderProduct.findAll({ where: { _idOrder } })

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
