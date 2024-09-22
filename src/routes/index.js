import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import productRoutes from './products/index.js'

const defaultRoutes = Router()

defaultRoutes.get('/', (req, res) => res.json({ msg: 'Hello world' }))
defaultRoutes.get('/halth', (req, res) => res.sendStatus(StatusCodes.NO_CONTENT))

export {
	defaultRoutes,
	productRoutes
}
