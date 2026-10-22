const { Sequelize } = require('sequelize')
require('dotenv').config()

// conectamos a la base de datos
// parametros de Sequelize(nombre de la base de datos, usuario, contrasena)
const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: 'localhost',
    port: process.env.DATABASE_PORT,
    dialect: 'mysql',
  }
)

module.exports = sequelize
