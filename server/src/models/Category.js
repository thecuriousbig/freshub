module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    Name: {
      type: DataTypes.STRING(30),
      primaryKey: true,
      autoIncrement: false,
      unique: true,
      allowNull: false
    },
    Tax: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  },
  {
    timestamps: false,
    freezeTableName: true
  })

  Category.associate = function (models) {
    Category.hasMany(models.Product, {foreignKey: 'CategoryName', sourceKey: 'Name'})
  }

  return Category
}