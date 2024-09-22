import sequelize from '../index.js'
import { DataTypes, UUIDV4 } from 'sequelize'

const Product = sequelize.define('Product', {
	_id: {
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
	description: {
		type: DataTypes.STRING(100),
		allowNull: true
	},
	price: {
		type: DataTypes.INTEGER,
		allowNull: false
	}
}, { timestamps: false })

export default Product
