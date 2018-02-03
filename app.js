'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const hbs = require('express-handlebars')
const app = express()
const api = require('./routes')

// Configuracion del parseo
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json')
  next()
})

// Configuracion motor de plantillas
app.engine('.hbs', hbs({
  defaultLayout: 'default',
  extname: '.hbs'
}))
app.set('view engine', '.hbs')

// Configuracion de rutas
app.use('/api', api)

// Confifuración del renderizado
app.get('/login', (req, res) => {
  res.render('login')
})

app.get('/signup', (req, res) => {
  res.render('signup')
})

app.get('/product', (req, res) => {
  res.render('product')
})

module.exports = app
