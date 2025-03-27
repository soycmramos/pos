import { randomUUID } from 'node:crypto'
import { Sequelize, Op } from 'sequelize'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import Order from '../database/models/Order.js'
import Customer from '../database/models/Customer.js'
import Product from '../database/models/Product.js'
export default class OrderModel {
	static create = async ({ customerId }) => {
		try {
			const orderId = randomUUID()
			return await Order.create({ id: orderId, customerId })
		} catch (error) {
			console.error(error)
			errors.push({ message: 'Something went wrong' })
			return ({
				status: 'failure',
				title: ReasonPhrases.INTERNAL_SERVER_ERROR,
				code: StatusCodes.INTERNAL_SERVER_ERROR,
				errors
			})
		}
	}

	static getOrdersByDate = async ({ startDate, endDate }) => {
		const errors = []

		try {
			const result = await Order.findAll({
				where: {
					createdAt: { [Op.between]: [startDate, endDate] }
				},
				include: {
					model: Customer,
					as: 'customer',
					attributes: ['name']
				}
			})


			if (!result.length > 0) {
				return ({
					status: 'success',
					title: ReasonPhrases.OK,
					code: StatusCodes.OK,
					data: []
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
			errors.push({ message: 'Something went wrong' })
			return ({
				status: 'failure',
				title: ReasonPhrases.INTERNAL_SERVER_ERROR,
				code: StatusCodes.INTERNAL_SERVER_ERROR,
				errors
			})
		}
	}

	static getById = async ({ orderId }) => {
		const errors = []

		const result = await Order.findOne({
			where: { id: orderId },
			include: [
				{
					model: Customer,
					as: 'customer',
					attributes: ['name'] // Solo traer el nombre del cliente
				},
				{
					model: Product,
					as: 'products',
					attributes: ['id', 'name'], // Solo traer los datos del producto
					through: {
						attributes: ['amount', 'price'] // Extraer amount y price de la tabla intermedia
					}
				}
			],
			attributes: {
				include: [
					[
						Sequelize.literal(`(
							SELECT SUM(op.amount * op.price)
							FROM OrderProducts op
							WHERE op.orderId = Order.id
						)`),
						'total'
					]
				]
			}
		});



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

		// result = OrderProductModel.getById({ orderId })

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
			errors.push({ message: 'Something went wrong' })
			return ({
				status: 'failure',
				title: ReasonPhrases.INTERNAL_SERVER_ERROR,
				code: StatusCodes.INTERNAL_SERVER_ERROR,
				errors
			})
		}
	}
}
