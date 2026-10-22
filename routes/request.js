const Router = require('express').Router()

const requestController = require('../controllers/request')

Router.get('/request', requestController.getAllRequest)
Router.get('/estado', requestController.getStatePage)
Router.get('/solicitar', requestController.getRequestPage)
Router.get('/request/:enrollment', requestController.getRequestStatus)
Router.post('/request', requestController.createRequest)
Router.put('/request', requestController.changeRequestStatus)
Router.delete('/request', requestController.deleteRequest)

module.exports = Router
