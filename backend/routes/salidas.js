const express = require('express');
const Producto = require('../models/productos');
const Salida = require('../models/salida');

const router = express.Router();

router.post('/', async (req, res) => {
  const { productoId, cantidad, destino } = req.body;

  const producto = await Producto.findById(productoId);

  if (!producto) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  if (producto.stock < cantidad) {
    return res.status(400).json({ error: 'Stock insuficiente' });
  }

  // Restar stock
  producto.stock -= cantidad;
  await producto.save();

  // Registrar salida
  const salida = new Salida({
    producto: productoId,
    cantidad,
    destino,
    usuario: req.session.usuario   
  });

  await salida.save();

  res.json({ mensaje: 'Salida registrada correctamente' });
});

// Listar salidas
router.get('/', async (req, res) => {
  const salidas = await Salida.find().populate('producto');
  res.json(salidas);
});

module.exports = router;
