'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')

// Conexion a base de datos mongodb
mongoose.connect(config.db, (err, res) => {
  if (err) {
    console.log(`Error al conectar a la base de datos: ${err}`)
  }
  console.log('Conexión a la base de datos establecida...')

  app.listen(config.port, () => {
    console.log(`API REST Corriendo en http://localhost:${config.port}`)
  })
})
