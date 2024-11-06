import { randomUUID } from 'node:crypto'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { Sequelize } from 'sequelize'
import Customer from '../database/models/Customer.js'

export default class CustomerModel {
	static create = async ({ name, identification }) => {
		const errors = []
		let result = await Customer.findOne({ where: { identification } })

		if (result instanceof Customer) {
			const code = 409
			const message = `Customer with identification ${result.identification} already exists`
			errors.push({ code, message })

			return ({
				status: 'failure',
				title: ReasonPhrases.CONFLICT,
				code: StatusCodes.CONFLICT,
				errors
			})
		}

		try {
			result = await Customer.create({
				id: randomUUID(),
				name,
				identification
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
			const result = await Customer.findAll()

			if (!result.length > 0) {
				const code = 404
				const message = 'No customers found'
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

	static getById = async ({ customerId }) => {
		const errors = []

		try {
			const result = await Customer.findOne({ where: { id: customerId } })

			if (!result) {
				const code = 404
				const message = 'Customer not found'
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

	static updateById = async ({ customerId, name, identification }) => {
		const errors = []

		try {
			let result = await Customer.findOne({ where: { id: customerId } })

			if (!result) {
				const code = 404
				const message = 'Customer not found'
				errors.push({ code, message })
				return ({
					status: 'failure',
					title: ReasonPhrases.NOT_FOUND,
					code: StatusCodes.NOT_FOUND,
					errors
				})
			}

			await Customer.update({
				name: Sequelize.fn('IFNULL', name, Sequelize.col('name')),
				identification: Sequelize.fn('IFNULL', identification, Sequelize.col('identification')),
			}, { where: { id: customerId } })

			result = await Customer.findOne({ where: { id: customerId } })

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

	static deleteById = async ({ customerId }) => {
		const errors = []

		try {
			let result = await Customer.findOne({ where: { id: customerId } })

			if (!result) {
				const code = 404
				const message = 'Customer not found'
				errors.push({ code, message })
				return ({
					status: 'failure',
					title: ReasonPhrases.NOT_FOUND,
					code: StatusCodes.NOT_FOUND,
					errors
				})
			}

			await Customer.destroy({ where: { id: customerId } })

			return ({
				status: 'success',
				title: ReasonPhrases.NO_CONTENT,
				code: StatusCodes.NO_CONTENT,
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
