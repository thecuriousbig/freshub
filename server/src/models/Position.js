module.exports = (sequelize, DataTypes) => {
	const Position = sequelize.define('Position', {
		ID: {
			type: DataTypes.MEDIUMINT,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},
		Position: {
			type: DataTypes.STRING,
			allowNull: false
		},
	}, { timestamps: false, freezeTableName: true })

	Position.associate = function (models) {
		Position.hasMany(models.Staff, { foreignKey: 'PositionID', sourceKey: 'ID'})
	}

	Position.prototype.getPosition = function () {
		return this.Position
	}

	return Position
}