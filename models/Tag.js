const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection.js");
const Category = require("./Category");
const Product = require("./Product");
const ProductTag = require("./ProductTag");

// Define the Tag model
class Tag extends Model {}

// Initialize the Tag model
Tag.init(
  {
    // Define the id attribute
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Define the tag_name attribute
    tag_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "tag",
  }
);

// Define association
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: "tag_id",
  as: "products",
});

// Export the Tag model
module.exports = Tag;

