import { randomUUID } from 'node:crypto'
import request from 'supertest'
import { assert } from 'chai'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import app from '../src/app.js'
import Product from '../src/database/models/Product.js'

const id = randomUUID()
const code = 'P123'
const name = 'Product name'
const price = 2500
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/

describe('POST /products', () => {
	it(`Should fail with status ${StatusCodes.BAD_REQUEST} for missing or invalid body`, async () => {
		try {
			await request(app)
				.post('/products')
				.set('Content-Type', 'application/json')
				.set('Accept', 'application/json')
				.send(JSON.stringify({}))
				.expect('Content-Type', /application\/json/)
				.expect(StatusCodes.BAD_REQUEST)
				.expect(res => {
					assert.exists(res.body)
					assert.isObject(res.body)
					assert.hasAllKeys(res.body, ['info', 'status', 'title', 'code', 'errors'])
					assert.isObject(res.body.info)
					assert.hasAllKeys(res.body.info, ['_timestamp', '_uuid'])
					assert.isString(res.body.info._uuid)
					assert.match(res.body.info._uuid, UUID_REGEX)
					assert.isString(res.body.info._timestamp)
					assert.match(res.body.info._timestamp, DATE_REGEX)
					assert.isString(res.body.status)
					assert.strictEqual(res.body.status, 'failure')
					assert.isString(res.body.title)
					assert.strictEqual(res.body.title, ReasonPhrases.BAD_REQUEST)
					assert.isNumber(res.body.code)
					assert.strictEqual(res.body.code, StatusCodes.BAD_REQUEST)
					assert.isArray(res.body.errors)
					assert.isNotEmpty(res.body.errors)
				})
		} catch (error) {
			throw Error(error)
		}
	})

	it(`should fail with status ${StatusCodes.BAD_REQUEST} if any required field is not submitted or empty`, async () => {
		try {
			await request(app)
				.post('/products')
				.set('Content-Type', 'application/json')
				.set('Accept', 'application/json')
				.send(JSON.stringify({ code, name }))
				.expect('Content-Type', /application\/json/)
				.expect(StatusCodes.BAD_REQUEST)
				.expect(res => {
					assert.exists(res.body)
					assert.isObject(res.body)
					assert.hasAllKeys(res.body, ['info', 'status', 'title', 'code', 'errors'])
					assert.isObject(res.body.info)
					assert.hasAllKeys(res.body.info, ['_timestamp', '_uuid'])
					assert.isString(res.body.info._uuid)
					assert.match(res.body.info._uuid, UUID_REGEX)
					assert.isString(res.body.info._timestamp)
					assert.match(res.body.info._timestamp, DATE_REGEX)
					assert.isString(res.body.status)
					assert.strictEqual(res.body.status, 'failure')
					assert.isString(res.body.title)
					assert.strictEqual(res.body.title, ReasonPhrases.BAD_REQUEST)
					assert.isNumber(res.body.code)
					assert.strictEqual(res.body.code, StatusCodes.BAD_REQUEST)
					assert.isArray(res.body.errors)
					assert.isNotEmpty(res.body.errors)
				})
		} catch (error) {
			throw Error(error)
		}
	})

	it(`It should fail with status ${StatusCodes.BAD_REQUEST} if any field is sent that is not defined in the contract`, async () => {
		try {
			await request(app)
				.post('/products')
				.set('Content-Type', 'application/json')
				.set('Accept', 'application/json')
				.send(JSON.stringify({ code, name, randomField: 'xyz' }))
				.expect('Content-Type', /application\/json/)
				.expect(StatusCodes.BAD_REQUEST)
				.expect(res => {
					assert.exists(res.body)
					assert.isObject(res.body)
					assert.hasAllKeys(res.body, ['info', 'status', 'title', 'code', 'errors'])
					assert.isObject(res.body.info)
					assert.hasAllKeys(res.body.info, ['_timestamp', '_uuid'])
					assert.isString(res.body.info._uuid)
					assert.match(res.body.info._uuid, UUID_REGEX)
					assert.isString(res.body.info._timestamp)
					assert.match(res.body.info._timestamp, DATE_REGEX)
					assert.isString(res.body.status)
					assert.strictEqual(res.body.status, 'failure')
					assert.isString(res.body.title)
					assert.strictEqual(res.body.title, ReasonPhrases.BAD_REQUEST)
					assert.isNumber(res.body.code)
					assert.strictEqual(res.body.code, StatusCodes.BAD_REQUEST)
					assert.isArray(res.body.errors)
					assert.isNotEmpty(res.body.errors)
				})
		} catch (error) {
			throw Error(error)
		}
	})

	it(`Should succeed with code ${StatusCodes.CREATED} if a new product is created`, async () => {
		try {
			await Product.truncate()
			await request(app)
				.post('/products')
				.set('Content-Type', 'application/json')
				.set('Accept', 'application/json')
				.send(JSON.stringify({ code, name, price }))
				.expect('Content-Type', /application\/json/)
				.expect(StatusCodes.CREATED)
				.expect(res => {
					const { body } = res
					assert.exists(body)
					assert.isObject(body)
					assert.hasAllKeys(body, ['info', 'status', 'title', 'code', 'data'])
					assert.isObject(body.info)
					assert.hasAllKeys(body.info, ['_timestamp', '_uuid'])
					assert.isString(body.info._uuid)
					assert.match(body.info._uuid, UUID_REGEX)
					assert.isString(body.info._timestamp)
					assert.match(body.info._timestamp, DATE_REGEX)
					assert.isString(body.status)
					assert.strictEqual(body.status, 'success')
					assert.isString(body.title)
					assert.strictEqual(body.title, ReasonPhrases.CREATED)
					assert.isNumber(body.code)
					assert.strictEqual(body.code, StatusCodes.CREATED)
					assert.isObject(body.data)
					assert.hasAllKeys(body.data, ['id', 'code', 'name', 'price', 'description', 'updatedAt', 'createdAt'])
					assert.isString(body.data.id)
					assert.match(body.data.id, UUID_REGEX)
					assert.isString(body.data.code)
					assert.isNotEmpty(body.data.code)
					assert.isString(body.data.name)
					assert.isNotEmpty(body.data.name)
					assert.isNumber(body.data.price)
					assert.operator(body.data.price, '>', 0)
					assert.oneOf(body.data.description, [null, 'string'])
					assert.isString(body.data.updatedAt)
					assert.match(body.data.updatedAt, DATE_REGEX)
					assert.isString(body.data.createdAt)
					assert.match(body.data.createdAt, DATE_REGEX)
				})
		} catch (error) {
			throw Error(error)
		}
	})

	it(`should fail with status ${StatusCodes.CONFLICT} if the product already exists`, async () => {
		try {
			await request(app)
				.post('/products')
				.set('Content-Type', 'application/json')
				.set('Accept', 'application/json')
				.send(JSON.stringify({ code, name, price }))
				.expect('Content-Type', /application\/json/)
				.expect(StatusCodes.CONFLICT)
				.expect(res => {
					assert.exists(res.body)
					assert.isObject(res.body)
					assert.hasAllKeys(res.body, ['info', 'status', 'title', 'code', 'errors'])
					assert.isObject(res.body.info)
					assert.hasAllKeys(res.body.info, ['_timestamp', '_uuid'])
					assert.isString(res.body.info._uuid)
					assert.match(res.body.info._uuid, UUID_REGEX)
					assert.isString(res.body.info._timestamp)
					assert.match(res.body.info._timestamp, DATE_REGEX)
					assert.isString(res.body.status)
					assert.strictEqual(res.body.status, 'failure')
					assert.isString(res.body.title)
					assert.strictEqual(res.body.title, ReasonPhrases.CONFLICT)
					assert.isNumber(res.body.code)
					assert.strictEqual(res.body.code, StatusCodes.CONFLICT)
					assert.isArray(res.body.errors)
					assert.isNotEmpty(res.body.errors)
				})
		} catch (error) {
			throw Error(error)
		}
	})
})
