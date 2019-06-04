module.exports = (sequelize, DataTypes) => {
  const WorkOrderPackage = sequelize.define('WorkOrderPackage', {
		WorkOrderID: {
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
		}
	}, { timestamps: false, freezeTableName: true })

	WorkOrderPackage.associate = function (models) {
		WorkOrderPackage.belongsTo(models.Product, {foreignKey: 'ProductID', targetKey: 'ID', onDelete: 'CASCADE', constraints: false})
		WorkOrderPackage.belongsTo(models.WorkOrder, {foreignKey: 'WorkOrderID', targetKey: 'ID', onDelete: 'CASCADE', constraints: false})
	}

	WorkOrderPackage.prototype.summary = function() {
		return 'WorkOrderID : '+this.WorkOrderID+' ProductID : '+this.ProductID+' Amount : '+this.Amount
	}

	return WorkOrderPackage
}