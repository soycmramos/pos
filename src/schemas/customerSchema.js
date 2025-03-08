import { z } from 'zod'

const customerSchema = z.object({
	name: z.string().trim().min(1),
	identification: z.string().trim().min(1),
}).strict()

const validateCustomerSchema = input => customerSchema.safeParse(input)
const validatePartialCustomerSchema = input => customerSchema.partial().safeParse(input)

export {
	validateCustomerSchema,
	validatePartialCustomerSchema
}
