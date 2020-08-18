import express from 'express'
import ClassesController from './controllers/classes.controller'
import ConnectionController from './controllers/connectios.controller'
import UsersController from './controllers/users.controller'
import AuthController from './controllers/auth.controller'

const Router = express.Router()
const classesController = new ClassesController()
const connectionsController = new ConnectionController()
const usersController = new UsersController()
const authController = new AuthController()

Router.route('/classes')
    .all(authController.index().authenticate())
    .get(classesController.index)
    .post(classesController.create)

Router.route('/classes/:id')
    .all(authController.index().authenticate())
    .get(classesController.getWithId)

Router.route('/connections')
    .all(authController.index().authenticate())
    .get(connectionsController.index)
    .post(connectionsController.create)

Router.route('/signup')
    .post(usersController.create)

Router.route('/signin')
    .post(usersController.index)

Router.route('/users/:id')
    .all(authController.index().authenticate())
    .post(usersController.showProfile)

Router.route('/users/favorite/:id?')
    .all(authController.index().authenticate())
    .get(usersController.listFavorites)
    .put(usersController.addFavorite)

Router.route('/users/edit/:id')
    .all(authController.index().authenticate())
    .put(usersController.editProfile)

export default Router