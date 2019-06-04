module.exports = (sequelize, DataTypes) => {
	const Import = sequelize.define('Import', {
		ID: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},
		MaterialOrderID: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		RecipientID: {
			type: DataTypes.MEDIUMINT,
			allowNull: false
		},
		ArrivedDate: {
			type: 'TIMESTAMP',
			allowNull: false
		},
	}, { timestamps: false, freezeTableName: true })

	Import.associate = function (models) {
		Import.belongsTo(models.Staff, { foreignKey: 'RecipientID', targetKey: 'ID', onDelete: 'CASCADE', constraints: false})
		Import.belongsTo(models.MaterialOrder, { foreignKey: 'MaterialOrderID', targetKey: 'ID', onDelete: 'CASCADE', constraints: false})
		Import.hasMany(models.ImportDetail, { foreignKey: 'ImportID', sourceKey: 'ID', onDelete: 'CASCADE', constraints: false})
	}

	return Import
}