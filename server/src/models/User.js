module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('User', {
    ID: {
      type: DataTypes.MEDIUMINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    UserName: {
      type: DataTypes.STRING(30),
      unique: true,
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING(40),
      unique: true,
      allowNull: false
    },
    Password: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    FirstName: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    LastName: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    Address: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    TelNo: {
      type: DataTypes.STRING(10),
      allowNull: false
    }
  }, { timestamps: false, freezeTableName: true })

  User.associate = function (models) {
    User.hasMany(models.PurchaseOrder, { foreignKey: 'UserID', sourceKey: 'ID'})
  }

  return User
}

