import { z } from 'zod'

const customerSchema = z.object({
	name: z.string().trim(),
	identification: z.string().trim(),
})

const validateCustomerSchema = input => customerSchema.safeParse(input)
const validatePartialCustomerSchema = input => customerSchema.partial().safeParse(input)

export {
	validateCustomerSchema,
	validatePartialCustomerSchema
}
