import sequelize from '../index.js'
import { DataTypes } from 'sequelize'
import Order from './Order.js'
import Product from './Product.js'

const OrderProduct = sequelize.define('OrderProduct', {
	_idOrder: {
		type: DataTypes.UUID,
		primaryKey: true,
		allowNull: false
	},
	_idProduct: {
		type: DataTypes.UUID,
		primaryKey: true,
		allowNull: false
	},
	amount: {
		type: DataTypes.INTEGER,
		allowNull: false,
	}
}, { timestamps: false })

Order.belongsToMany(Product, { through: OrderProduct, foreignKey: '_idOrder', sourceKey: '_id' })
Product.belongsToMany(Order, { through: OrderProduct, foreignKey: '_idProduct', sourceKey: '_id' })

export default OrderProduct
