import { z } from 'zod'

const productSchema = z.object({
	code: z.string().trim(),
	name: z.string().trim(),
	price: z.number().int().positive(),
	description: z.string().trim().optional().nullable()
})

const validateProductSchema = input => productSchema.safeParse(input)
const validatePartialProductSchema = input => productSchema.partial().safeParse(input)

export {
	validateProductSchema,
	validatePartialProductSchema
}
