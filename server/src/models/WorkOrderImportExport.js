module.exports = (sequelize, DataTypes) => {
	const WorkOrderImportExport = sequelize.define('WorkOrderImportExport', {
		WorkOrderID: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false
		},
		PurchaseOrderID: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		MaterialOrderID: {
			type: DataTypes.INTEGER,
			allowNull: true
		}
	}, { timestamps: false, freezeTableName: true })

	WorkOrderImportExport.associate = function (models) {
		WorkOrderImportExport.belongsTo(models.WorkOrder, {foreignKey: 'WorkOrderID', targetKey: 'ID',onDelete: 'CASCADE', constraints: false})
		WorkOrderImportExport.belongsTo(models.PurchaseOrder, {foreignKey: 'PurchaseOrderID', targetKey: 'ID',onDelete: 'CASCADE', constraints: false})
		WorkOrderImportExport.belongsTo(models.MaterialOrder, {foreignKey: 'MaterialOrderID', targetKey: 'ID',onDelete: 'CASCADE', constraints: false})
	}

	WorkOrderImportExport.prototype.summary = function() {
		return 'WorkOrderID : '+this.WorkOrderID+' PurchaseOrderID : '+this.PurchaseOrderID+' MaterialOrderID : '+this.MaterialOrderID
	}

	return WorkOrderImportExport
}