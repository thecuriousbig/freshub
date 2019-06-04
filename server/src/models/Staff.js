module.exports = (sequelize, DataTypes) => {
  const Staff = sequelize.define('Staff', {
    ID: {
      type: DataTypes.MEDIUMINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,

    },
    FirstName: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    LastName: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false
    },
    Password: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    Address: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    TelNo: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    PositionID: {
      type: DataTypes.MEDIUMINT,
      allowNull: false
    }
  }, { timestamps: false, freezeTableName: true })

  Staff.associate = function (models) {
    Staff.hasMany(models.Export, {foreignKey: 'StaffID', sourceKey: 'ID'})
    Staff.hasMany(models.WorkOrder, {foreignKey: 'StaffID', sourceKey: 'ID', as: 'Staff'})
    Staff.hasMany(models.WorkOrder, {foreignKey: 'ManagerID', sourceKey: 'ID', as: 'Manager'})
    Staff.hasMany(models.Import, {foreignKey: 'RecipientID', sourceKey: 'ID'})
		Staff.belongsTo(models.Position, { foreignKey: 'PositionID', targetKey: 'ID', onDelete: 'CASCADE', constraints: false})
  }

  Staff.prototype.getPositionID = function() {
    return this.PositionID
  }

  return Staff
}

