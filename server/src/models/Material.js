module.exports = (sequelize, DataTypes) => {

	const Material = sequelize.define('Material', {
		ID: {
			type: DataTypes.MEDIUMINT,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false
		},
		MaterialName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		Unit: {
			type: DataTypes.STRING(10),
			allowNull: false
		},
		Amount: {
			type: DataTypes.MEDIUMINT,
			allowNull: false
		}
	}, { timestamps: false, freezeTableName: true })

	Material.associate = function (models) {
		Material.hasMany(models.Requisition, { foreignKey: 'MaterialID', sourceKey: 'ID'})
		Material.hasMany(models.ProductConversion, { foreignKey: 'MaterialID', sourceKey: 'ID'})
		Material.hasMany(models.MaterialOrderDetail, { foreignKey: 'MaterialID', sourceKey: 'ID'})
		Material.hasMany(models.ImportDetail, { foreignKey: 'MaterialID', sourceKey: 'ID'})
	}
	return Material
}