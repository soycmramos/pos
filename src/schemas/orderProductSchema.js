import { z } from 'zod'

const orderProductSchema = z.object({
	customerId: z.string().trim().uuid().min(36),
	products: z.array(z.object({
		id: z.string().trim().uuid().min(36),
		amount: z.number().int().positive()
	}).strict()).nonempty()
}).strict()

const validateOrderProductSchema = input => orderProductSchema.safeParse(input)
const validatePartialOrderProductSchema = input => orderProductSchema.partial().safeParse(input)

export {
	validateOrderProductSchema,
	validatePartialOrderProductSchema
}
