const API_BASE_URL = 'http://localhost/prueba-desarrollador-fullstack/api/index.php';

document.getElementById('loginForm')?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('emailLogin').value;
  const password = document.getElementById('passwordLogin').value;

  const formData = new FormData();
  formData.append('email', email);
  formData.append('password', password);

  try {
    const response = await fetch(`${API_BASE_URL}?endpoint=login`, {
      method: 'POST',
      body: formData
    });
    const responseText = await response.text();  
    if (responseText !== 'null') {
      localStorage.setItem('authToken', responseText); 
      window.location.href = 'pagina-principal.html';
    } else {
      alert('Credenciales incorrectas. Por favor, verifica tu correo y contraseña.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Hubo un problema con el servidor.');
  }
});
