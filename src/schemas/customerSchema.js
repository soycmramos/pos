import { z } from 'zod'

const CustomerSchema = z.object({
	name: z.string().trim(),
	identification: z.string().trim(),
})

const validateCustomerSchema = input => CustomerSchema.safeParse(input)
const validatePartialCustomerSchema = input => CustomerSchema.partial().safeParse(input)

export {
	validateCustomerSchema,
	validatePartialCustomerSchema
}
