import sequelize from '../index.js'
import { DataTypes } from 'sequelize'

const Order = sequelize.define('Order', {
	_id: {
		type: DataTypes.UUID,
		primaryKey: true,
		allowNull: false,
		defaultValue: DataTypes.UUIDV4
	}
}, { timestamps: false })

export default Order
