const Sequelize = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	const MaterialOrder = sequelize.define('MaterialOrder', {
		ID: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},
		ManufacturerID: {
			type: DataTypes.SMALLINT,
			allowNull: false,
		},
		OrderDate: {
			type: 'TIMESTAMP',
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			allowNull: false
		},
		DeliverDate: {
			type: 'TIMESTAMP',
			allowNull: false
		},
		Status: {
			type: DataTypes.STRING(7),
			allowNull: false
		}
	}, { timestamps: false, freezeTableName: true })

	MaterialOrder.associate = function (models) {
		MaterialOrder.hasMany(models.MaterialOrderDetail, { foreignKey: 'MaterialOrderID', sourceKey: 'ID'})
		MaterialOrder.hasOne(models.WorkOrderImportExport, { foreignKey: 'MaterialOrderID', sourceKey: 'ID'})
		MaterialOrder.hasMany(models.Import, { foreignKey: 'MaterialOrderID', sourceKey: 'ID'})
		MaterialOrder.belongsTo(models.Manufacturer, { foreignKey: 'ManufacturerID', targetKey: 'ID',onDelete: 'CASCADE', constraints: false})
	}

	return MaterialOrder
}