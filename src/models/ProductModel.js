import { randomUUID } from 'node:crypto'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { Sequelize } from 'sequelize'
import Product from '../database/models/Product.js'

export default class ProductModel {
	static create = async ({ code, name, price, description }) => {
		const errors = []
		let result = await Product.findOne({ where: { code } })

		if (result instanceof Product) {
			const code = 409
			const message = `Product with code ${result.code} already exists`
			errors.push({ code, message })

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
			const result = await Product.findAll()

			if (!result.length > 0) {
				const code = 404
				const message = 'No products found'
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

	static getById = async ({ productId }) => {
		const errors = []

		try {
			const result = await Product.findOne({ where: { id: productId } })

			if (!result) {
				const code = 404
				const message = 'Product not found'
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

	static updateById = async ({ productId, code, name, description, price }) => {
		const errors = []

		try {
			let result = await Product.findOne({ where: { id: productId } })

			if (!result) {
				const code = 404
				const message = 'Product not found'
				errors.push({ code, message })
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

			result = await Product.findOne({ where: { id: productId } })

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

	static deleteById = async ({ productId }) => {
		const errors = []

		try {
			let result = await Product.findOne({ where: { id: productId } })

			if (!result) {
				const code = 404
				const message = 'Product not found'
				errors.push({ code, message })
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
