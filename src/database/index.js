import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { Sequelize } from 'sequelize'

const __dirname = dirname(fileURLToPath(import.meta.url))

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: join(__dirname, 'pos.sqlite')
})

export default sequelize
