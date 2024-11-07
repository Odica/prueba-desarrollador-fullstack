const API_BASE_URL = 'http://localhost/prueba-desarrollador-fullstack/api/index.php';

// Manejo del formulario de creación de categoría
document.getElementById('categoryForm')?.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Verificar el token 
  const token = localStorage.getItem('authToken');
  const parsedToken = token ? token.replace(/['"]+/g, '') : null;
  if (!parsedToken) {
    alert('No estás autenticado. Por favor, inicia sesión primero.');
    return;
  }

  const categoryName = document.getElementById('categoryName').value;

  const formData = new FormData();
  formData.append('name', categoryName);
  formData.append('token', parsedToken); 

  try {
    const response = await fetch(`${API_BASE_URL}?endpoint=create_category`, {
      method: 'POST',
      body: formData
    });

    const responseText = await response.text();
    console.log(responseText);
    if (responseText === 'true') {
      alert('Categoría creada exitosamente');
      window.location.href = 'pagina-principal.html'; 
    } else {
      alert('Error al crear la categoría. Intenta de nuevo.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Hubo un problema con el servidor.');
  }
});
