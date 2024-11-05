import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import ProductModel from '../models/ProductModel.js'
import { validateProductSchema, validatePartialProductSchema } from '../schemas/productSchema.js'

export default class ProductController {
	static create = async (req, res) => {
		const validation = validateProductSchema(req.body)

		if (!validation.success) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({
					status: 'failure',
					title: ReasonPhrases.BAD_REQUEST,
					code: StatusCodes.BAD_REQUEST,
					errors: JSON.parse(validation.error.message)
				})
		}

		const result = await ProductModel.create({ ...validation.data })

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
		const { productId } = req.params
		const result = await ProductModel.getById({ productId })
		return res
			.status(result.code)
			.json(result)
	}

	static updateById = async (req, res) => {
		const { productId } = req.params
		const validation = validatePartialProductSchema(req.body)

		if (!validation.success) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({
					status: 'failure',
					title: ReasonPhrases.BAD_REQUEST,
					code: StatusCodes.BAD_REQUEST,
					errors: JSON.parse(validation.error.message)
				})
		}

		const result = await ProductModel.updateById({ productId, ...validation.data })
		return res
			.status(result.code)
			.json(result)
	}

	static deleteById = async (req, res) => {
		const { productId } = req.params
		const result = await ProductModel.deleteById({ productId })
		return res
			.status(result.code)
			.json(result)
	}
}
