module.exports = (sequelize, DataTypes) => {
  const PurchaseOrderDetail = sequelize.define('PurchaseOrderDetail', {
		PurchaseOrderID: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false
		},
		ProductID: {
			type: DataTypes.MEDIUMINT,
			primaryKey: true,
			allowNull: false
		},
		Amount: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		Cost:{
			type: DataTypes.DOUBLE,
			allowNull: false
		}
	}, { timestamps: false, freezeTableName: true })

	PurchaseOrderDetail.associate = function (models) {
		PurchaseOrderDetail.belongsTo(models.Product, {foreignKey: 'ProductID', targetKey: 'ID',onDelete: 'CASCADE', constraints: false})
		PurchaseOrderDetail.belongsTo(models.PurchaseOrder, {foreignKey: 'PurchaseOrderID', targetKey: 'ID',onDelete: 'CASCADE', constraints: false})
	}

	return PurchaseOrderDetail
}