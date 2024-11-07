// URL base de la API
const API_BASE_URL = 'http://localhost/prueba-desarrollador-fullstack/api/index.php?endpoint=register';

// Función para enviar el formulario de registro
document.getElementById('registerForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const email = document.getElementById('emailRegister').value;
  const password = document.getElementById('passwordRegister').value;

  const formData = new FormData();
  formData.append('username', username);
  formData.append('email', email);
  formData.append('password', password);

  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      const data = await response.json();
      alert('Registro exitoso');
      document.getElementById('registerForm').reset();
    } else {
      alert('Error en el registro');
    }
  } catch (error) {
    console.error('Error:', error);
  }
});

