module.exports = (sequelize, DataTypes) => {
  const Duty = sequelize.define('Duty', {
    DutyID: {
      type: DataTypes.TINYINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    DutyName: {
      type: DataTypes.STRING(30),
      unique: true,
      allowNull: false
    },
  }, { timestamps: false, freezeTableName: true })

  Duty.associate = function (models) {
    Duty.hasMany(models.WorkOrder, { foreignKey: 'DutyID', sourceKey: 'DutyID'})
  }

  Duty.prototype.getDutyID = function() {
    return this.DutyID
  }

  return Duty
}

