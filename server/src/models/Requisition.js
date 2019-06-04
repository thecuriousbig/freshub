module.exports = (sequelize, DataTypes) => {
	const Requisition = sequelize.define('Requisition', {
		MaterialID: {
			type: DataTypes.MEDIUMINT,
			primaryKey: true,
			allowNull: false
		},
		WorkOrderID: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false
		},
		Amount: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	}, { timestamps: false, freezeTableName: true })

	Requisition.associate = function (models) {
		Requisition.belongsTo(models.WorkOrder, {foreignKey: 'WorkOrderID', targetKey: 'ID',onDelete: 'CASCADE', constraints: false})
		Requisition.belongsTo(models.Material, {foreignKey: 'MaterialID', targetKey: 'ID',onDelete: 'CASCADE', constraints: false})
	}

	return Requisition
}