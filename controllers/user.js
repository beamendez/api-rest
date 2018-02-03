'use strict'

const User = require('../models/user')
const services = require('../services')

function signUp (req, res) {
  const user = new User({
    email: req.body.email,
    displayName: req.body.displayName,
    password: req.body.password
  })

  User.findOne({ email: req.body.email }).exec((err, userExists) => {
    if (err) return res.status(500).send({ message: `Error al crear el usuario: ${err}` })
    if (userExists) return res.status(404).send({ message: 'El usuario ya existe' })
    user.save((err, user) => {
      if (err) return res.status(500).send({ message: `Error al guardar el usuario: ${err}` })
      console.log('Usuario con email ' + user.email + ' creado')
      return res.status(200).send({
        message: 'Tu usuario se ha creado',
        token: services.createToken(user)
      })
    })
  })
}

function signIn (req, res, done) {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) return res.status(500).send({ message: `Error al validar del acceso: ${err}` })
    if (!user) return res.status(404).send({ message: 'No existe el usuario' })
    user.comparePassword(req.body.password, function (err, match) {
      if (err) return res.status(500).send({ message: `Error al comparar el password: ${err}` })
      console.log('Usuario con email ' + user.email + ' validado')
      if (match) {
        res.status(200).send({
          message: 'Has iniciado sesión',
          token: services.createToken(user)
        })
      } else {
        res.status(401).send({
          message: 'Tus datos son incorrectos'
        })
      }
    })
  })
}

function logout (req, res) {
  res.status(200).send({
    message: 'Has cerrado la sesión',
    token: null
  })
}

function getUsers (req, res) {
  User.find({}, (err, users) => {
    if (err) return res.status(200).send({ message: `Error al realizar la petición ${err}` })
    if (!users) return res.status(404).send({ message: 'No existen usuarios' })

    res.status(200).send({ users })
  })
}

function deleteUser (req, res) {
  let userId = req.params.userId

  User.findById(userId, (err, user) => {
    if (err) res.status(500).send({ message: `Error al borrar el usuario: ${err}` })

    user.remove(err => {
      if (err) res.status(500).send({ message: `Error al borrar el usuario: ${err}` })
      res.status(200).send({ message: 'El usuario ha sido eliminado' })
    })
  })
}

module.exports = {
  signUp,
  signIn,
  logout,
  getUsers,
  deleteUser
}
