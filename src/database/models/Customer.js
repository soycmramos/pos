import sequelize from '../index.js'
import { DataTypes } from 'sequelize'
// import Order from './Order.js'

const Customer = sequelize.define('Customer', {
	_id: {
		type: DataTypes.UUID,
		primaryKey: true,
		allowNull: false,
		defaultValue: DataTypes.UUIDV4
	},
	dni: {
		type: DataTypes.STRING(10),
		unique: true,
		allowNull: false
	},
	name: {
		type: DataTypes.STRING(30),
		allowNull: false,
	},
}, { timestamps: false })

// Customer.hasMany(Order, { foreignKey: '_idCustomer' })

export default Customer
