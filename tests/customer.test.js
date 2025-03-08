import { randomUUID } from 'node:crypto'
import request from 'supertest'
import { assert } from 'chai'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import app from '../src/app.js'
import Customer from '../src/database/models/Customer.js'

const id = randomUUID()
const name = 'Anna Kendrick'
const identification = '9876543210'
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/

describe('POST /customers', () => {
	it(`Should fail with status ${StatusCodes.BAD_REQUEST} for missing or invalid body`, async () => {
		try {
			await request(app)
				.post('/customers')
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
				.post('/customers')
				.set('Content-Type', 'application/json')
				.set('Accept', 'application/json')
				.send(JSON.stringify({ name, identification: '' }))
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

	it(`It should fail with status ${StatusCodes.BAD_REQUEST} if any field is sent that is not defined in the contract.`, async () => {
		try {
			await request(app)
				.post('/customers')
				.set('Content-Type', 'application/json')
				.set('Accept', 'application/json')
				.send(JSON.stringify({ name, identification, randomField: 'xyz' }))
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

	it(`Should succeed with code ${StatusCodes.CREATED} if a new customer is created`, async () => {
		try {
			await Customer.truncate()
			await request(app)
				.post('/customers')
				.set('Content-Type', 'application/json')
				.set('Accept', 'application/json')
				.send(JSON.stringify({ name, identification }))
				.expect('Content-Type', /application\/json/)
				.expect(StatusCodes.CREATED)
				.expect(res => {
					assert.exists(res.body)
					assert.isObject(res.body)
					assert.hasAllKeys(res.body, ['info', 'status', 'title', 'code', 'data'])
					assert.isObject(res.body.info)
					assert.hasAllKeys(res.body.info, ['_timestamp', '_uuid'])
					assert.isString(res.body.info._uuid)
					assert.match(res.body.info._uuid, UUID_REGEX)
					assert.isString(res.body.info._timestamp)
					assert.match(res.body.info._timestamp, DATE_REGEX)
					assert.isString(res.body.status)
					assert.strictEqual(res.body.status, 'success')
					assert.isString(res.body.title)
					assert.strictEqual(res.body.title, ReasonPhrases.CREATED)
					assert.isNumber(res.body.code)
					assert.strictEqual(res.body.code, StatusCodes.CREATED)
					assert.isObject(res.body.data)
					assert.hasAllKeys(res.body.data, ['id', 'name', 'identification', 'updatedAt', 'createdAt'])
					assert.isString(res.body.data.id)
					assert.match(res.body.data.id, UUID_REGEX)
					assert.isString(res.body.data.name)
					assert.isNotEmpty(res.body.data.name)
					assert.isString(res.body.data.identification)
					assert.isNotEmpty(res.body.data.identification)
					assert.isString(res.body.data.updatedAt)
					assert.match(res.body.data.updatedAt, DATE_REGEX)
					assert.isString(res.body.data.createdAt)
					assert.match(res.body.data.createdAt, DATE_REGEX)
				})
		} catch (error) {
			throw Error(error)
		}
	})

	it(`should fail with status ${StatusCodes.CONFLICT} if the customer already exists`, async () => {
		try {
			await request(app)
				.post('/customers')
				.set('Content-Type', 'application/json')
				.set('Accept', 'application/json')
				.send(JSON.stringify({ name, identification }))
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
