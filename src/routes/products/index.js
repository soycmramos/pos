import { randomUUID } from 'node:crypto'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import { Router } from 'express'
import Product from '../../database/models/Product.js'

const router = Router()

router.put('/products', async (req, res) => {
	const { code, name, description, price } = req.body
	const requiredFields = { code, name, price }
	const errors = []

	for (const prop in requiredFields) {
		if (requiredFields[prop] === 0) {
			const code = 400
			const detail = `${prop} cannot be 0`
			errors.push({ code, detail })
			continue
		}

		if (!requiredFields[prop] || !String(requiredFields[prop]).trim().length) {
			const code = 400
			const detail = `${prop} is mandatory or cannot be empty`
			errors.push({ code, detail })
		}
	}

	if (errors.length) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({
				status: 'failure',
				title: ReasonPhrases.BAD_REQUEST,
				code: StatusCodes.BAD_REQUEST,
				errors
			})
	}

	let result = await Product.findOne({ where: { code } })

	if (result instanceof Product) {
		const code = 409
		const detail = `Product with code ${result.code} already exists`
		errors.push({ code, detail })
	}

	if (errors.length) {
		return res
			.status(StatusCodes.CONFLICT)
			.json({
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

		return res
			.status(StatusCodes.CREATED)
			.json({
				status: 'success',
				title: ReasonPhrases.CREATED,
				code: StatusCodes.CREATED,
				data: result
			})

	} catch (error) {
		console.error(error)
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({
				status: 'failure',
				title: ReasonPhrases.INTERNAL_SERVER_ERROR,
				code: StatusCodes.INTERNAL_SERVER_ERROR,
				errros: [
					{
						code: StatusCodes.INTERNAL_SERVER_ERROR,
						detail: 'Something went wrong'
					}
				]
			})
	}
})

export default router
