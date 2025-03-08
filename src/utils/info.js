import { randomUUID } from 'node:crypto'

const info = () => {
	return ({
		_uuid: randomUUID(),
		_timestamp: new Date().toISOString()
	})
}

export default info
