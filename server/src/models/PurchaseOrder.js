module.exports = (sequelize, DataTypes) => {

  const PurchaseOrder = sequelize.define('PurchaseOrder', {
		ID: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},
		UserID: {
			type: DataTypes.MEDIUMINT,
			allowNull: false
		},
		FirstName: {
			type: DataTypes.STRING(30),
			allowNull: false
		},
		LastName: {
			type: DataTypes.STRING(30),
			allowNull: false
		},
		TelNo: {
			type: DataTypes.STRING(10),
			allowNull: false
		},
		OrderDate: {
			type: 'TIMESTAMP',
			allowNull: false
		},
		DeliverDate: {
			type: 'TIMESTAMP',
			allowNull: false
		},
		PaymentID: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		ShippingAddress: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		Status: {
			type: DataTypes.STRING(15),
			allowNull: false
		}
	}, { timestamps: false, freezeTableName: true })

	PurchaseOrder.associate = function (models) {
		PurchaseOrder.hasOne(models.Export, { foreignKey: 'PurchaseOrderID', sourceKey: 'ID'})
		PurchaseOrder.hasOne(models.WorkOrderImportExport, { foreignKey: 'PurchaseOrderID', sourceKey: 'ID'})
		PurchaseOrder.hasMany(models.PurchaseOrderDetail, { foreignKey: 'PurchaseOrderID', sourceKey: 'ID'})
		PurchaseOrder.belongsTo(models.PaymentMethod, { foreignKey: 'PaymentID', targetKey: 'ID',onDelete: 'CASCADE', constraints: false})
		PurchaseOrder.belongsTo(models.User, { foreignKey: 'UserID', targetKey: 'ID',onDelete: 'CASCADE', constraints: false})
	}

	return PurchaseOrder
}