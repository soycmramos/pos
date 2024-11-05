import sequelize from '../index.js'
import { DataTypes } from 'sequelize'
import Order from './Order.js'
import Product from './Product.js'

const OrderProduct = sequelize.define('OrderProduct', {
	orderId: {
		type: DataTypes.UUID,
		primaryKey: true,
		allowNull: false,
		references: {
			model: Order,
			key: 'id'
		}
	},
	productId: {
		type: DataTypes.UUID,
		primaryKey: true,
		allowNull: false,
		references: {
			model: Product,
			key: 'id'
		}
	},
	amount: {
		type: DataTypes.INTEGER.UNSIGNED,
		allowNull: false,
	}
})

Order.belongsToMany(Product, { through: OrderProduct, foreignKey: 'orderId', sourceKey: 'id' })
Product.belongsToMany(Order, { through: OrderProduct, foreignKey: 'productId', sourceKey: 'id' })

export default OrderProduct
