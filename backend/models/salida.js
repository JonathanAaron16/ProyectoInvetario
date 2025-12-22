const mongoose = require('mongoose');

const SalidaSchema = new mongoose.Schema({
  producto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Producto',
    required: true
  },
  cantidad: {
    type: Number,
    required: true
  },
  destino: {
    type: String,
    required: true
  },
    usuario: {
    type: String,
    required: true
    },
  fecha: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Salida', SalidaSchema);
