const Router = require('express').Router()
const adminController = require('../controllers/admin')

Router.get('/login', adminController.getLogin)
Router.post('/login', adminController.postLogin)

module.exports = Router
