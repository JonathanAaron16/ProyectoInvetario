require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');        
const session = require('express-session');

const PORT = process.env.PORT || 3000;

console.log('MONGO_URI:', process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Mongo Atlas conectado'))
  .catch(err => console.log(err));



const salidasRoutes = require('./routes/salidas');

const productosRoutes = require('./routes/productos');
const authRoutes = require('./routes/auth');

const app = express();

app.use(session({
  secret: 'inventario-secreto',
  resave: false,
  saveUninitialized: false
}));


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/salidas', salidasRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/productos', productosRoutes);


// 🔹 SERVIR FRONTEND
app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/login.html'));
});




app.listen(PORT, () => {
  console.log(`Servidor iniciado en puerto ${PORT}`);
});