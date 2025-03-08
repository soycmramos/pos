import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { validateCustomerSchema, validatePartialCustomerSchema } from '../schemas/customerSchema.js'
import CustomerModel from './../models/CustomerModel.js'
import info from '../utils/info.js'
export default class CustomerController {
	static create = async (req, res) => {
		const validation = validateCustomerSchema(req.body)

		if (!validation.success) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({
					info: info(),
					title: ReasonPhrases.BAD_REQUEST,
					code: StatusCodes.BAD_REQUEST,
					errors: JSON.parse(validation.error.message)
				})
		}

		const result = await CustomerModel.create({ ...validation.data })

		return res
			.status(result.code)
			.json({ info: info(), ...result })
	}

	static getAll = async (req, res) => {
		const result = await CustomerModel.getAll()
		return res
			.status(result.code)
			.json({ info: info(), ...result })
	}

	static getById = async (req, res) => {
		const { customerId } = req.params
		const result = await CustomerModel.getById({ customerId })
		return res
			.status(result.code)
			.json({ info: info(), ...result })
	}

	static updateById = async (req, res) => {
		const { customerId } = req.params
		const validation = validatePartialCustomerSchema(req.body)

		if (!validation.success) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({
					info: info(),
					status: 'failure',
					title: ReasonPhrases.BAD_REQUEST,
					code: StatusCodes.BAD_REQUEST,
					errors: JSON.parse(validation.error.message)
				})
		}

		const result = await CustomerModel.updateById({ customerId, ...validation.data })
		return res
			.status(result.code)
			.json({ info: info(), ...result })
	}

	static deleteById = async (req, res) => {
		const { customerId } = req.params
		const result = await CustomerModel.deleteById({ customerId })
		return res
			.status(result.code)
			.json({ info: info(), ...result })
	}
}
