// routes/productos.js


const express = require('express');
const Producto = require('../models/productos');
const router = express.Router();
const auth = require('../middleware/auth');

// Crear producto (stock inicial)
router.post('/', async (req, res) => {
  const { nombre, categoria, cantidad } = req.body;

  const producto = new Producto({
    nombre,
    categoria,
    stock: cantidad
  });
    
  

  await producto.save();
  res.json(producto);


});

// Listar productos
router.get('/', auth, async (req, res) => {
  const productos = await Producto.find();
  res.json(productos);
});

/// SUMAR STOCK
router.put('/:id/sumar',auth, async (req, res) => {
  const { cantidad } = req.body;

  if (cantidad <= 0) {
    return res.status(400).json({ error: 'Cantidad inválida' });
  }

  const producto = await Producto.findById(req.params.id);

  if (!producto) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  producto.stock += cantidad;
  await producto.save();

  res.json(producto);
});




// ELIMINAR PRODUCTO
router.delete('/:id',auth, async (req, res) => {
  const producto = await Producto.findById(req.params.id);

  if (!producto) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  await producto.deleteOne();

  res.json({ mensaje: 'Producto eliminado correctamente' });
});

// DESCONTAR STOCK
router.put('/:id/descontar', auth, async (req, res) => {
  const { cantidad } = req.body;

  if (cantidad <= 0) {
    return res.status(400).json({ error: 'Cantidad inválida' });
  }

  const producto = await Producto.findById(req.params.id);

  if (!producto) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  if (producto.stock < cantidad) {
    return res.status(400).json({ error: 'Stock insuficiente' });
  }

  producto.stock -= cantidad;
  await producto.save();

  res.json(producto);
});


module.exports = router;
