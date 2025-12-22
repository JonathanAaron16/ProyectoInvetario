const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');

const router = express.Router();

// REGISTRAR USUARIO (solo vos al principio)
router.post('/register', async (req, res) => {
  const { usuario, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const nuevoUsuario = new Usuario({
    usuario,
    password: hash
  });

  await nuevoUsuario.save();

  res.json({ mensaje: 'Usuario creado' });
});

// LOGIN
router.post('/login', async (req, res) => {
  const { usuario, password } = req.body;

  const user = await Usuario.findOne({ usuario });

  if (!user) {
    return res.status(401).json({ error: 'Usuario incorrecto' });
  }

  const ok = await bcrypt.compare(password, user.password);

  if (!ok) {
    return res.status(401).json({ error: 'Contraseña incorrecta' });
  }

  req.session.usuario = user.usuario;

  res.json({ mensaje: 'Login correcto' });
});

// LOGOUT
router.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ mensaje: 'Logout ok' });
});

// CHECK
router.get('/me', (req, res) => {
  if (!req.session.usuario) {
    return res.status(401).json({ error: 'No autenticado' });
  }

  res.json({ usuario: req.session.usuario });
});

//// crear usuario con POST EN TRUNDER CLIENTE
router.post('/register', async (req, res) => {
  const { usuario, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const nuevoUsuario = new Usuario({
    usuario,
    password: hash
  });

  await nuevoUsuario.save();

  res.json({ mensaje: 'Usuario creado' });
});



module.exports = router;
