import { randomUUID } from 'node:crypto'
import { Sequelize } from 'sequelize'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import Customer from '../database/models/Customer.js'

export default class CustomerModel {
	static create = async ({ name, identification }) => {
		const errors = []

		try {
			let result = await Customer.findOne({ where: { identification } })

			if (result instanceof Customer) {
				errors.push({ message: `Customer with identification '${result.identification}' already exists` })
				return ({
					status: 'failure',
					title: ReasonPhrases.CONFLICT,
					code: StatusCodes.CONFLICT,
					errors
				})
			}

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
			const result = await Customer.findAll()

			if (!result.length > 0) {
				errors.push({ message: 'No customers found' })
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

	static getById = async ({ customerId }) => {
		const errors = []

		try {
			const result = await Customer.findOne({ where: { id: customerId } })

			if (!result) {
				errors.push({ message: 'Customer not found' })
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

	static updateById = async ({ customerId, name, identification }) => {
		const errors = []

		try {
			let result = await Customer.findByPk(customerId)

			if (!result) {
				errors.push({ message: 'Customer not found' })
				return ({
					status: 'failure',
					title: ReasonPhrases.NOT_FOUND,
					code: StatusCodes.NOT_FOUND,
					errors
				})
			}

			await Customer.update({
				name: Sequelize.fn('IFNULL', name, Sequelize.col('name')),
				identification: Sequelize.fn('IFNULL', identification, Sequelize.col('identification'))
			}, { where: { id: customerId } })

			result = await Customer.findByPk(customerId)

			return ({
				status: 'success',
				title: ReasonPhrases.OK,
				code: StatusCodes.OK,
				data: result
			})

		} catch (error) {
			console.error(error)

			if (error.name == 'SequelizeUniqueConstraintError') {
				errors.push({ message: `Customer with identification '${identification}' already exists` })
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

	static deleteById = async ({ customerId }) => {
		const errors = []

		try {
			let result = await Customer.findOne({ where: { id: customerId } })

			if (!result) {
				errors.push({ message: 'Customer not found' })
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
