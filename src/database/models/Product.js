import sequelize from '../index.js'
import { DataTypes } from 'sequelize'

const Product = sequelize.define('Product', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		allowNull: false,
		defaultValue: DataTypes.UUIDV4
	},
	code: {
		type: DataTypes.STRING(10),
		unique: true,
		allowNull: false
	},
	name: {
		type: DataTypes.STRING(30),
		allowNull: false,
	},
	price: {
		type: DataTypes.INTEGER.UNSIGNED,
		allowNull: false
	},
	description: {
		type: DataTypes.STRING(255),
		allowNull: true,
		defaultValue: null
	}
})

export default Product
