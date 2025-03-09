import { randomUUID } from 'node:crypto'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { Sequelize } from 'sequelize'
import Product from '../database/models/Product.js'

export default class ProductModel {
	static create = async ({ code, name, price, description }) => {
		const errors = []
		let result = await Product.findOne({ where: { code } })

		if (result instanceof Product) {
			errors.push({ message: `Product with code ${result.code} already exists` })

			return ({
				status: 'failure',
				title: ReasonPhrases.CONFLICT,
				code: StatusCodes.CONFLICT,
				errors
			})
		}

		try {
			result = await Product.create({
				id: randomUUID(),
				code,
				name,
				price,
				description
			})

			return ({
				status: 'success',
				title: ReasonPhrases.CREATED,
				code: StatusCodes.CREATED,
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

	static getAll = async () => {
		const errors = []

		try {
			const result = await Product.findAll()

			if (!result.length > 0) {
				errors.push({ message: 'No products found' })
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
			errors.push({ message: 'Something went wrong' })
			return ({
				status: 'failure',
				title: ReasonPhrases.INTERNAL_SERVER_ERROR,
				code: StatusCodes.INTERNAL_SERVER_ERROR,
				errors
			})
		}
	}

	static getById = async ({ productId }) => {
		const errors = []

		try {
			const result = await Product.findByPk(productId)

			if (!result) {
				errors.push({ message: 'Product not found' })
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
			errors.push({ message: 'Something went wrong' })
			return ({
				status: 'failure',
				title: ReasonPhrases.INTERNAL_SERVER_ERROR,
				code: StatusCodes.INTERNAL_SERVER_ERROR,
				errors
			})
		}
	}

	static updateById = async ({ productId, code, name, description, price }) => {
		const errors = []

		try {
			let result = await Product.findByPk(productId)

			if (!result) {
				errors.push({ message: 'Product not found' })
				return ({
					status: 'failure',
					title: ReasonPhrases.NOT_FOUND,
					code: StatusCodes.NOT_FOUND,
					errors
				})
			}

			await Product.update({
				code: Sequelize.fn('IFNULL', code, Sequelize.col('code')),
				name: Sequelize.fn('IFNULL', name, Sequelize.col('name')),
				description: Sequelize.fn('IFNULL', description, Sequelize.col('description')),
				price: Sequelize.fn('IFNULL', price, Sequelize.col('price'))
			}, { where: { id: productId } })

			result = await Product.findByPk(productId)

			return ({
				status: 'success',
				title: ReasonPhrases.OK,
				code: StatusCodes.OK,
				data: result
			})

		} catch (error) {
			console.error(error)

			if (error.name == 'SequelizeUniqueConstraintError') {
				errors.push({ message: `Product with code '${code}' already exists` })
				return ({
					status: 'failure',
					title: ReasonPhrases.CONFLICT,
					code: StatusCodes.CONFLICT,
					errors
				})
			}

			return ({
				status: 'failure',
				title: ReasonPhrases.INTERNAL_SERVER_ERROR,
				code: StatusCodes.INTERNAL_SERVER_ERROR,
				errors
			})
		}
	}

	static deleteById = async ({ productId }) => {
		const errors = []

		try {
			let result = await Product.findOne({ where: { id: productId } })

			if (!result) {
				errors.push({ message: 'Product not found' })
				return ({
					status: 'failure',
					title: ReasonPhrases.NOT_FOUND,
					code: StatusCodes.NOT_FOUND,
					errors
				})
			}

			await Product.destroy({ where: { id: productId } })

			return ({
				status: 'success',
				title: ReasonPhrases.OK,
				code: StatusCodes.OK,
				data: null
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
