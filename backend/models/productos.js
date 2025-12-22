

// models/Producto.js
// models/Producto.js
const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  categoria: String,
  stock: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Producto', ProductoSchema);
