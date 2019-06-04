module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    ID: {
      type: DataTypes.MEDIUMINT,
      primaryKey: true,
      autoIncrement: true
    },
    Name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    CategoryName: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    Unit: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    Price: DataTypes.DOUBLE,
    Amount: DataTypes.SMALLINT
  }, { timestamps: false, freezeTableName: true })

  Product.associate = function (models) {
    Product.belongsTo(models.Category, { foreignKey: 'CategoryName', targetKey: 'Name',onDelete: 'CASCADE', constraints: false})
    Product.hasOne(models.ProductConversion, { foreignKey: 'ProductID', sourceKey: 'ID'})
    Product.hasMany(models.PurchaseOrderDetail, { foreignKey: 'ProductID', sourceKey: 'ID'})
    Product.hasMany(models.ExportDetail, { foreignKey: 'ProductID', sourceKey: 'ID'})
    Product.hasMany(models.WorkOrderPackage, { foreignKey: 'ProductID', sourceKey: 'ID'})
  }

  Product.prototype.getID = function() {
    return this.ID
  }

  return Product
}
  