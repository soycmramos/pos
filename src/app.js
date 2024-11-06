import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { config } from 'dotenv'
import morgan from 'morgan'
import {
	defaultRoutes,
	productRoutes,
	orderRoutes,
	customerRoutes
} from './routes/index.js'

config()

const app = express()

// settings
app.set('port', process.env.PORT || 5000)
app.set('json spaces', 2)

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

// routes
app.use(defaultRoutes)
app.use(productRoutes)
app.use(orderRoutes)
app.use(customerRoutes)

export default app
