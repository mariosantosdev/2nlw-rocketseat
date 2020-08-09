import express from 'express'
import ClassesController from './controllers/classes.controller'
import ConnectionController from './controllers/connectios.controller'

const routes = express.Router()
const classesController = new ClassesController()
const connectionsController = new ConnectionController()

routes.get('/classes', classesController.index)
routes.post('/classes', classesController.create)

routes.get('/connections', connectionsController.index)
routes.post('/connections', connectionsController.create)

export default routes