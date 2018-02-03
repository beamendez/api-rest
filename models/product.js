'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = Schema({
  name: String,
  image: String,
  price: { type: Number, default: 0 },
  category: { type: String, enum: ['camisetas', 'otros'] },
  description: String,
  deliveryStimate: String
})

module.exports = mongoose.model('Product', ProductSchema)
