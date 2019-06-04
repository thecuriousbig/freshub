module.exports = (sequelize, DataTypes) => {

  const Manufacturer = sequelize.define('Manufacturer', {
    ID: {
      type: DataTypes.SMALLINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    ManufacturerName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    Address: {
      type: DataTypes.TEXT,
      allowNull: false
    }
    ,
    TelNo: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
  }, { timestamps: false, freezeTableName: true })

  Manufacturer.associate = function (models) {
    Manufacturer.hasMany(models.MaterialOrder, { foreignkey: 'ManufacturerID', sourceKey: 'ID'})
  }

  return Manufacturer
}

