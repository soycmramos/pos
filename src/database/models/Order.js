import sequelize from '../index.js'
import { DataTypes } from 'sequelize'
import Customer from './Customer.js'

const Order = sequelize.define('Order', {
	_id: {
		type: DataTypes.UUID,
		primaryKey: true,
		allowNull: false,
		defaultValue: DataTypes.UUIDV4
	},
	_idCustomer: {
		type: DataTypes.UUID,
		allowNull: false,
		defaultValue: DataTypes.UUIDV4,
		references: {
			model: Customer,
			key: '_id'
		}
	}
}, { timestamps: false })

Order.belongsTo(Customer, { foreignKey: '_idCustomer' })

export default Order
