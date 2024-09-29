import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import ProductModel from '../models/ProductModel.js'

export default class ProductController {
	static create = async (req, res) => {
		const errors = []

		if (!req.body || !Object.entries(req.body).length) {
			const code = StatusCodes.BAD_REQUEST
			const message = 'Request body not found or empty'
			errors.push({ code, message })

			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({
					status: 'failure',
					title: ReasonPhrases.BAD_REQUEST,
					code: StatusCodes.BAD_REQUEST,
					errors
				})
		}

		const { code, name, description, price } = req.body
		const requiredFields = { code, name, price }

		if (isNaN(price) || typeof price === 'string' || String(price).includes('.')) {
			const code = StatusCodes.BAD_REQUEST
			const message = `The 'price' parameter must be of primitive integer type`
			errors.push({ code, message })
		}

		if (!isNaN(price) && price <= 0) {
			const code = StatusCodes.BAD_REQUEST
			const message = `The 'price' parameter cannot be less than or equal to zero`
			errors.push({ code, message })
		}

		for (const prop in requiredFields) {
			if (!requiredFields[prop] || !String(requiredFields[prop]).trim()) {
				const code = StatusCodes.BAD_REQUEST
				const message = `The '${prop}' parameter is mandatory or must not be empty`
				errors.push({ code, message })
			}
		}

		if (errors.length > 0) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({
					status: 'failure',
					title: ReasonPhrases.BAD_REQUEST,
					code: StatusCodes.BAD_REQUEST,
					errors
				})
		}

		const result = await ProductModel.create({ code, name, description, price })
		return res
			.status(result.code)
			.json(result)
	}

	static getAll = async (req, res) => {
		const result = await ProductModel.getAll()
		return res
			.status(result.code)
			.json(result)
	}

	static getById = async (req, res) => {
		const { idProduct } = req.params
		const result = await ProductModel.getById({ idProduct })
		return res
			.status(result.code)
			.json(result)
	}
}
