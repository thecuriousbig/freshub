const Sequelize = require('sequelize')
module.exports = (sequelize, DataTypes) => {

	const WorkOrder = sequelize.define('WorkOrder', {
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
		DutyID: {
			type: DataTypes.TINYINT,
			allowNull: false
		},
		ManagerID: {
			type: DataTypes.MEDIUMINT,
			allowNull: false
		},
		OrderDateTime: {
			type: 'TIMESTAMP',
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			allowNull: false
		},
		DueDateTime: {
			type: 'TIMESTAMP',
			allowNull: false
		},
		Status: {
			type: DataTypes.STRING(15),
			allowNull: false
		}
	}, { timestamps: false, freezeTableName: true })

	WorkOrder.associate = function (models) {
		WorkOrder.belongsTo(models.Staff, {foreignKey: 'StaffID', targetKey: 'ID', as: 'Staff',onDelete: 'CASCADE', constraints: false})
		WorkOrder.belongsTo(models.Staff, {foreignKey: 'ManagerID', targetKey: 'ID', as: 'Manager',onDelete: 'CASCADE', constraints: false})
		WorkOrder.hasOne(models.WorkOrderImportExport, {foreignKey: 'WorkOrderID', sourceKey: 'ID'})
		WorkOrder.hasMany(models.Requisition, {foreignKey: 'WorkOrderID', sourceKey: 'ID'})
		WorkOrder.belongsTo(models.Duty, {foreignKey: 'DutyID', targetKey: 'DutyID',onDelete: 'CASCADE', constraints: false})
		WorkOrder.hasMany(models.WorkOrderPackage, {foreignKey: 'WorkOrderID', sourceKey: 'ID'})
	}

	WorkOrder.prototype.getID = function() {
		return this.ID
	}

	return WorkOrder
}