import { z } from 'zod'

const productSchema = z.object({
	code: z.string().trim().min(1),
	name: z.string().trim().min(1),
	price: z.number().int().positive(),
	description: z.string().trim().optional().nullable()
}).strict()

const validateProductSchema = input => productSchema.safeParse(input)
const validatePartialProductSchema = input => productSchema.partial().safeParse(input)

export {
	validateProductSchema,
	validatePartialProductSchema
}
