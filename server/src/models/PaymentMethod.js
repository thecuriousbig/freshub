module.exports = (sequelize, DataTypes) => {

	const PaymentMethod = sequelize.define('PaymentMethod', {
		ID: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},
		PaymentMethod: {
			type: DataTypes.STRING(30),
			unique: true,
			allowNull: false
		}
	}, { timestamps: false, freezeTableName: true })

	PaymentMethod.associate = function (models) {
		PaymentMethod.hasMany(models.PurchaseOrder, { foreignKey: 'PaymentID', sourceKey: 'ID'})
	}

	return PaymentMethod
}