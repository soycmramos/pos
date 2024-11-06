import { z } from 'zod'

const orderProductSchema = z.object({
	customerId: z.string().uuid(),
	products: z.array(z.object({
		id: z.string().uuid(),
		amount: z.number().int().positive()
	})).nonempty()
})

const validateOrderProductSchema = input => orderProductSchema.safeParse(input)
const validatePartialOrderProductSchema = input => orderProductSchema.partial().safeParse(input)

export {
	validateOrderProductSchema,
	validatePartialOrderProductSchema
}
