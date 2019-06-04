module.exports = (sequelize, DataTypes) => {
	const ProductConversion = sequelize.define('ProductConversion', {
		ProductID: {
			type: DataTypes.MEDIUMINT,
			primaryKey: true,
			allowNull: false
		},
		MaterialID: {   //change from material name to material id
			type: DataTypes.MEDIUMINT,
			allowNull: false
		},
		MaterialAmount: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	}, { timestamps: false, freezeTableName: true })

	ProductConversion.associate = function(models) {
		ProductConversion.belongsTo(models.Product, { foreignKey: 'ProductID', targetKey: 'ID',onDelete: 'CASCADE', constraints: false})
		ProductConversion.belongsTo(models.Material, { foreignKey: 'MaterialID', targetKey: 'ID',onDelete: 'CASCADE', constraints: false})
	}

	return ProductConversion
}
  