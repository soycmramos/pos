import app from './app.js'
import sequelize from './database/index.js'

app.listen(app.get('port'), () => {
	console.log(`Server running on http://localhost:${app.get('port')}`)
})

try {
	// await sequelize.sync({ force: true })
	await sequelize.sync()
	console.log('Connection has been established successfully')
} catch (error) {
	console.error('Unable to connect to the database:', error)
}
