import { randomUUID } from 'node:crypto'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { assert } from 'chai'
import app from '../../src/app.js'
import Customer from '../../src/database/models/Customer.js'

const id = randomUUID()
const name = 'Anna Kendrick'
const identification = '9876543210'

describe('POST /customers', () => {
	it.only(`Should fail with status ${StatusCodes.BAD_REQUEST} for missing or invalid body`, async () => {
		try {
			await request(app)
				.post('/customers')
				.set('Content-Type', 'application/json')
				.set('Accept', 'application/json')
				.send(JSON.stringify({}))
				.expect('Content-Type', /application\/json/)
				.expect(StatusCodes.BAD_REQUEST)
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
					assert.hasAllKeys(res.body, ['meta', 'status', 'title', 'code', 'message', 'data'])
					assert.isObject(res.body.meta)
					assert.hasAllKeys(res.body.meta, ['_timestamp', '_uuid', '_path'])
					assert.strictEqual(res.body.status, 'failure')
					assert.strictEqual(res.body.title, ReasonPhrases.BAD_REQUEST)
					assert.strictEqual(res.body.code, StatusCodes.BAD_REQUEST)
					assert.isNull(res.body.data)
				})
		} catch (error) {
			throw Error(error)
		}
	})

	it(`Should succeed with code ${StatusCodes.CREATED} if a new contact is created`, async () => {
		try {
			await pool.query('DELETE FROM contacts')
			await pool.query('INSERT INTO contacts (id, identification, name) VALUES (?, ?, ?)', [id, identification, name])
			await request(app)
				.post('/customers')
				.set('Content-Type', 'application/json')
				.set('Accept', 'application/json')
				.send(JSON.stringify({ id, name, identification }))
				.expect('Content-Type', /application\/json/)
				.expect(StatusCodes.CREATED)
				.expect(res => {
					assert.exists(res.body)
					assert.isObject(res.body)
					assert.hasAllKeys(res.body, ['meta', 'status', 'title', 'code', 'message', 'data'])
					assert.isObject(res.body.meta)
					assert.hasAllKeys(res.body.meta, ['_timestamp', '_uuid', '_path'])
					assert.strictEqual(res.body.status, 'success')
					assert.strictEqual(res.body.title, ReasonPhrases.CREATED)
					assert.strictEqual(res.body.code, StatusCodes.CREATED)
					assert.isObject(res.body.data)
					assert.hasAllKeys(res.body.data, ['id', 'name', 'identification', 'createdAt'])
				})
		} catch (error) {
			throw Error(error)
		}
	})
})
