const form = document.getElementById('formProducto');
const lista = document.getElementById('listaProductos');

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



//mostrar productos

form.addEventListener('submit', async e => {
  e.preventDefault();

  const producto = {
    nombre: nombre.value,
    categoria: categoria.value,
    cantidad: Number(cantidad.value)
  };

  await fetch('http://localhost:3000/api/productos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto)
  });

  form.reset();
  cargarProductos();
});
async function cargarProductos() {
  const res = await fetch('/api/productos');
  const productos = await res.json();

  const tabla = document.getElementById('tablaProductos');
  tabla.innerHTML = '';

  productos.forEach(p => {
    tabla.innerHTML += `
      <tr>
        <td>${p.nombre}</td>
        <td>${p.categoria || '-'}</td>
        <td>${p.stock}</td>
        <td>
        <button onclick="sumarStock('${p._id}')">➕ Sumar</button>
          <button onclick="descontarStock('${p._id}', ${p.stock})">➖ Descontar </button>
          <button onclick="eliminarProducto('${p._id}')"> 🗑 Eliminar  </button>
        </td>
      </tr>
    `;
  });
}


//descontar stock/////////////////////////////////////////////////////////////
async function descontarStock(id, stockActual) {
  const cantidad = Number(
    prompt(`Stock actual: ${stockActual}\nCantidad a descontar:`)
  );

  if (!cantidad || cantidad <= 0) {
    alert('Cantidad inválida');
    return;
  }

  if (cantidad > stockActual) {
    alert('No hay stock suficiente');
    return;
  }

  await fetch(`/api/productos/${id}/descontar`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cantidad })
  });

  cargarProductos();
}


async function sumarStock(id) {
  const cantidad = Number(prompt('Cantidad a sumar:'));

  if (!cantidad || cantidad <= 0) {
    alert('Cantidad inválida');
    return;
  }

  await fetch(`/api/productos/${id}/sumar`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cantidad })
  });

  cargarProductos();
}


cargarProductos();






async function eliminarProducto(id) {
  const confirmar = confirm('¿Seguro que querés eliminar este producto?');

  if (!confirmar) return;

  await fetch(`/api/productos/${id}`, {
    method: 'DELETE'
  });

  cargarProductos();
  cargarProductosSalida();
  
 
}


cargarProductos();

