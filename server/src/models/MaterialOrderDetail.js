module.exports = (sequelize, DataTypes) => {
	const MaterialOrderDetail = sequelize.define('MaterialOrderDetail', {
		MaterialOrderID: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false
		},
		MaterialID: { // this is surrogate key for material
			type: DataTypes.MEDIUMINT,
			primaryKey: true,
			allowNull: false
		},
		PricePerUnit: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		Amount: {
			type: DataTypes.MEDIUMINT,
			allowNull: false
		}
	}, { timestamps: false, freezeTableName: true })

	MaterialOrderDetail.associate = function (models) {
		MaterialOrderDetail.belongsTo(models.Material, { foreignKey: 'MaterialID', targetKey: 'ID',onDelete: 'CASCADE', constraints: false})
		MaterialOrderDetail.belongsTo(models.MaterialOrder, { foreignKey: 'MaterialOrderID', TargetKey: 'ID',onDelete: 'CASCADE', constraints: false})
	}

	return MaterialOrderDetail
}