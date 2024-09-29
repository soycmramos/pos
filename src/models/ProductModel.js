import { randomUUID } from 'node:crypto'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import Product from '../database/models/Product.js'

export default class ProductModel {
	static create = async ({ code, name, description, price }) => {
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
				_id: randomUUID(),
				code,
				name,
				description,
				price
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
}
