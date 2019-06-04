module.exports = (sequelize, DataTypes) => {
  const Export = sequelize.define('Export', {
		ID: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},
		StaffID: {
			type: DataTypes.MEDIUMINT,
			allowNull: false
		},
		PurchaseOrderID: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		DepartureDate: {
			type: 'TIMESTAMP',
			allowNull: false
		},
		Reason: DataTypes.TEXT
	}, { timestamps: false, freezeTableName: true })

	Export.associate = function (models) {
		Export.hasMany(models.ExportDetail, { foreignKey: 'ExportID', sourceKey: 'ID'})
		Export.belongsTo(models.PurchaseOrder, { foreignKey: 'PurchaseOrderID', targetKey: 'ID',onDelete: 'CASCADE', constraints: false})
		Export.belongsTo(models.Staff, { foreignKey: 'StaffID', targetKey: 'ID',onDelete: 'CASCADE', constraints: false})
	}
	
	return Export
}