import { Router } from 'express'
import ProductController from '../../controllers/ProductController.js'

const router = Router()

router.put('/products', ProductController.create)
router.get('/products', ProductController.getAll)
router.get('/products/:idProduct', ProductController.getById)

// router.patch('/products/:idProduct', async (req, res) => {
// 	const { idProduct } = req.params
// 	const { code, name, description, price } = req.body
// 	const requiredFields = { code, name, price }
// 	const errors = []

// 	for (const prop in requiredFields) {
// 		if (requiredFields[prop] === 0) {
// 			const code = 400
// 			const detail = `${prop} cannot be 0`
// 			errors.push({ code, detail })
// 			continue
// 		}

// 		if (requiredFields[prop] && !String(requiredFields[prop]).trim().length) {
// 			const code = 400
// 			const detail = `${prop} cannot be empty`
// 			errors.push({ code, detail })
// 		}
// 	}

// 	if (errors.length) {
// 		return res
// 			.status(StatusCodes.BAD_REQUEST)
// 			.json({
// 				status: 'failure',
// 				title: ReasonPhrases.BAD_REQUEST,
// 				code: StatusCodes.BAD_REQUEST,
// 				errors
// 			})
// 	}

// 	let result = await Product.findOne({ where: { _id: idProduct } })

// 	if (!result) {
// 		const code = 404
// 		const detail = `Product not found`
// 		errors.push({ code, detail })
// 	}

// 	if (errors.length) {
// 		return res
// 			.status(StatusCodes.NOT_FOUND)
// 			.json({
// 				status: 'failure',
// 				title: ReasonPhrases.NOT_FOUND,
// 				code: StatusCodes.NOT_FOUND,
// 				errors
// 			})
// 	}

// 	try {
// 		await Product.update({
// 			code: Sequelize.fn('IFNULL', code, Sequelize.col('code')),
// 			name: Sequelize.fn('IFNULL', name, Sequelize.col('name')),
// 			description: Sequelize.fn('IFNULL', description, Sequelize.col('description')),
// 			price: Sequelize.fn('IFNULL', price, Sequelize.col('price'))
// 		}, { where: { _id: idProduct } })

// 		result = await Product.findOne({ where: { _id: idProduct } })

// 		return res
// 			.status(StatusCodes.OK)
// 			.json({
// 				status: 'success',
// 				title: ReasonPhrases.OK,
// 				code: StatusCodes.OK,
// 				data: result
// 			})

// 	} catch (error) {
// 		console.error(error)
// 		return res
// 			.status(StatusCodes.INTERNAL_SERVER_ERROR)
// 			.json({
// 				status: 'failure',
// 				title: ReasonPhrases.INTERNAL_SERVER_ERROR,
// 				code: StatusCodes.INTERNAL_SERVER_ERROR,
// 				errros: [
// 					{
// 						code: StatusCodes.INTERNAL_SERVER_ERROR,
// 						detail: 'Something went wrong'
// 					}
// 				]
// 			})
// 	}
// })

// router.delete('/products/:idProduct', async (req, res) => {
// 	const { idProduct } = req.params
// 	const errors = []

// 	try {
// 		let result = await Product.findOne({ where: { _id: idProduct } })

// 		if (!result) {
// 			const code = 404
// 			const detail = 'Product not found'
// 			errors.push({ code, detail })
// 		}

// 		if (errors.length) {
// 			return res
// 				.status(StatusCodes.NOT_FOUND)
// 				.json({
// 					status: 'failure',
// 					title: ReasonPhrases.NOT_FOUND,
// 					code: StatusCodes.NOT_FOUND,
// 					errors
// 				})
// 		}

// 		result = await Product.destroy({ where: { _id: idProduct } })

// 		return res
// 			.status(StatusCodes.OK)
// 			.json({
// 				status: 'success',
// 				title: ReasonPhrases.OK,
// 				code: StatusCodes.OK,
// 				data: null
// 			})
// 	} catch (error) {
// 		console.error(error)
// 		return res
// 			.status(StatusCodes.INTERNAL_SERVER_ERROR)
// 			.json({
// 				status: 'failure',
// 				title: ReasonPhrases.INTERNAL_SERVER_ERROR,
// 				code: StatusCodes.INTERNAL_SERVER_ERROR,
// 				errros: [
// 					{
// 						code: StatusCodes.INTERNAL_SERVER_ERROR,
// 						detail: 'Something went wrong'
// 					}
// 				]
// 			})
// 	}
// })

export default router
