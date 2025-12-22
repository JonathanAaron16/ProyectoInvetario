const btnLogin = document.getElementById('btnLogin');
const error = document.getElementById('loginError');

btnLogin.addEventListener('click', async () => {
  const usuario = document.getElementById('usuario').value;
  const password = document.getElementById('password').value;

  error.textContent = '';

  if (!usuario || !password) {
    error.textContent = 'Completá todos los campos';
    return;
  }

  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario, password })
  });

  if (res.ok) {
    window.location.href = 'index.html';
  } else {
    error.textContent = 'Usuario o contraseña incorrectos';
  }
});
