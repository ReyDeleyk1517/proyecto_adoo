const { DataTypes } = require('sequelize')
const sequelize = require('../database')

const Request = sequelize.define('request', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  enrollment: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  curp: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  comments: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})

module.exports = Request
