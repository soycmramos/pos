import sequelize from '../index.js'
import { DataTypes } from 'sequelize'

const Customer = sequelize.define('Customer', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		allowNull: false,
		defaultValue: DataTypes.UUIDV4
	},
	identification: {
		type: DataTypes.STRING(10),
		unique: true,
		allowNull: false
	},
	name: {
		type: DataTypes.STRING(30),
		allowNull: false,
	},
})

export default Customer
