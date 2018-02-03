'use-strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')

function createToken (user) {
  const payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  }
  return jwt.encode(payload, config.SECRET_TOKEN)
}

function decodeToken (token) {
  const decoded = new Promise((resolve, reject) => {
    try {
      const payload = jwt.decode(token, config.SECRET_TOKEN)

      if (payload.exp <= moment().unix()) {
        const error = {
          status: 401,
          message: 'El Token ha expirado'
        }
        reject(error)
      }

      resolve(payload.sub)
    } catch (err) {
      const error = {
        status: 500,
        message: 'Invalid Token'
      }
      reject(error)
    }
  })

  return decoded
}

module.exports = {
  createToken,
  decodeToken
}
