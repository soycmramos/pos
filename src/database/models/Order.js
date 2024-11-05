import sequelize from '../index.js'
import { DataTypes } from 'sequelize'
import Customer from './Customer.js'

const Order = sequelize.define('Order', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		allowNull: false,
		defaultValue: DataTypes.UUIDV4
	},
	customerId: {
		type: DataTypes.UUID,
		allowNull: false,
		defaultValue: DataTypes.UUIDV4,
		references: {
			model: Customer,
			key: 'id'
		}
	}
})

Order.belongsTo(Customer, { foreignKey: 'customerId' })

export default Order
