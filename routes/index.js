'use strict'

const express = require('express')
const productCtrl = require('../controllers/product')
const userCtrl = require('../controllers/user')
const auth = require('../middlewares/auth')
const api = express.Router()

// Rutas de producto
api.get('/products', productCtrl.getProducts)
api.get('/products/:productId', productCtrl.getProduct)
api.post('/products', productCtrl.saveProduct)
api.put('/products/:productId', productCtrl.updateProduct)
api.delete('/products/:productId', productCtrl.deleteProduct)

// Rutas de usuario
api.get('/user', userCtrl.getUsers)
api.delete('/user/:userId', userCtrl.deleteUser)

// Rutas de login
api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)
api.get('/logout', userCtrl.logout)

// Ruta privada ejemplo del curso
api.get('/private', auth, (req, res) => {
  res.status(200).send({ message: 'Tienes acceso' })
})

module.exports = api
