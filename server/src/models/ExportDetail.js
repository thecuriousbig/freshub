module.exports = (sequelize, DataTypes) => {
  const ExportDetail = sequelize.define('ExportDetail', {
		ExportID: {
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
			type: DataTypes.MEDIUMINT,
			allowNull: false
		}
	}, { timestamps: false, freezeTableName: true })

	ExportDetail.associate = function (models) {
		ExportDetail.belongsTo(models.Product, { foreignKey: 'ProductID', targetKey: 'ID',onDelete: 'CASCADE', constraints: false})
		ExportDetail.belongsTo(models.Export, { foreignKey: 'ExportID', targetKey: 'ID',onDelete: 'CASCADE', constraints: false})
	}

	return ExportDetail
}