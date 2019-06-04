module.exports = (sequelize, DataTypes) => {

	const ImportDetail = sequelize.define('ImportDetail', {
		ImportID: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false
		},
		MaterialID: {
			type: DataTypes.MEDIUMINT,
			primaryKey: true,
			allowNull: false
		},
		Amount: {
			type: DataTypes.MEDIUMINT,
			allowNull: false
		},
		Reason: DataTypes.TEXT
	}, { timestamps: false, freezeTableName: true })

	ImportDetail.associate = function (models) {
		ImportDetail.belongsTo(models.Material, { foreignKey: 'MaterialID', targetKey: 'ID',onDelete: 'CASCADE', constraints: false})
		ImportDetail.belongsTo(models.Import, { foreignKey: 'ImportID', targetKey: 'ID',onDelete: 'CASCADE', constraints: false})
	}

	return ImportDetail
}