// the variable are

/*
    id,
    registration number,
    business name,
    GSTIN,
    registration date,
    taxpayer_type,
    business_nature,
    address,
    entity_type

*/

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // assuming your Sequelize instance is exported from database.js

const Gst = sequelize.define(
  "Gst",
  {
    id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
    },
    registration_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    business_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    gstin_status: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    registration_date: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    taxpayer_type: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    business_nature: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    entity_type: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "gst",
    timestamps: true,
    underscored:true
  }
);

// Foreign key relationship with doctors (assuming the 'doctors' model is defined)
Gst.associate = (models) => {
  Gst.belongsTo(models.Doctor, {
    foreignKey: "id",
    targetKey: "id",
    onDelete: "CASCADE", // or other appropriate behavior
  });
};

module.exports = Gst;
