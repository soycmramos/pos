import { Router } from 'express'
import ProductController from '../../controllers/ProductController.js'

const router = Router()

router.put('/products', ProductController.create)
router.get('/products', ProductController.getAll)
router.get('/products/:idProduct', ProductController.getById)
router.patch('/products/:idProduct', ProductController.updateById)

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
