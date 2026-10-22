// importaciones
const express = require('express')
const sequelize = require('./database')
const path = require('path')

const initialData = require('./initialData')

// Import routers
const requestRoutes = require('./routes/request')
const adminRoutes = require('./routes/admin')

// Inicializamos la app
const app = express()

// body parser
app.use(express.json())
app.use(express.urlencoded())

// cors middlewares
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  )
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

app.use(express.static(path.join(__dirname, 'public')))

// middlewares
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'))
})
app.use(requestRoutes)
app.use(adminRoutes)

// ponemos a correr el servidor
sequelize
  .sync()
  .then((response) => {
    console.log('server runnign and connected to database')
    initialData()
    app.listen(8000)
  })
  .catch((err) => {
    console.log(err)
  })
