
const selectProducto = document.getElementById('productoSalida');
const btnSalida = document.getElementById('btnSalida');
const listaSalidas = document.getElementById('listaSalidas');


fetch('/api/auth/me')
  .then(res => {
    if (!res.ok) {
      location.href = 'login.html';
      return;
    }
    return res.json();
  })
  .then(data => {
    if (data?.usuario) {
      document.getElementById('usuarioNav').textContent =
        '👤 ' + data.usuario;
    }
  });

const btnLogout = document.getElementById('btnLogout');

if (btnLogout) {
  btnLogout.addEventListener('click', async () => {
    await fetch('/api/auth/logout', {
      method: 'POST'
    });

    window.location.href = 'login.html';
  });
}



btnSalida.addEventListener('click', async () => {
  const salida = {
    productoId: selectProducto.value,
    cantidad: Number(cantidadSalida.value),
    destino: destinoSalida.value
  };

  await fetch('/api/salidas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(salida)
  });

  cantidadSalida.value = '';
  destinoSalida.value = '';

  cargarProductos();
  cargarProductosSalida();
  cargarSalidas();
});

async function cargarSalidas() {
  const res = await fetch('/api/salidas');
  const salidas = await res.json();

  const tabla = document.getElementById('tablaSalidas');
  tabla.innerHTML = '';

  salidas.forEach(s => {
    tabla.innerHTML += `
      <tr>
        <td>${s.producto ? s.producto.nombre : 'Producto eliminado'}</td>
        <td>${s.cantidad}</td>
        <td>${s.destino}</td>
        <td>${s.usuario}</td>
        <td>${new Date(s.fecha).toLocaleString()}</td>
      </tr>
    `;
  });
}

async function cargarProductosSalida() {
  const res = await fetch('/api/productos');
  const productos = await res.json();

  productoSalida.innerHTML = '<option value="">-- Seleccionar --</option>';

  productos.forEach(p => {
    productoSalida.innerHTML += `
      <option value="${p._id}">
        ${p.nombre} (Stock: ${p.stock})
      </option>
    `;
  });
}



cargarProductosSalida()
cargarSalidas();
