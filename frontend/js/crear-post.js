const API_BASE_URL = 'http://localhost/prueba-desarrollador-fullstack/api/index.php';

// Función para cargar las categorías disponibles
async function cargarCategorias() {
  // Verificar el token 
  const token = localStorage.getItem('authToken');
  if (!token) {
    alert('No estás autenticado. Por favor, inicia sesión primero.');
    return;
  }

  const parsedToken = token.replace(/['"]+/g, '');

  try {
    const response = await fetch(`${API_BASE_URL}?endpoint=get_categories&token=${parsedToken}`, {
      method: 'GET'
    });

    const categorias = await response.json();

    if (categorias && categorias.length > 0) {
      const select = document.getElementById('category_id');
      categorias.forEach((categoria) => {
        const option = document.createElement('option');
        option.value = categoria.id;
        option.textContent = categoria.name;
        select.appendChild(option);
      });
    } else {
      alert('No se encontraron categorías disponibles.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Hubo un problema al cargar las categorías.');
  }
}

// Manejo del formulario de creación de post
document.getElementById('postForm')?.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Verificar que el token esté guardado en localStorage
  const token = localStorage.getItem('authToken');
  if (!token) {
    alert('No estás autenticado. Por favor, inicia sesión primero.');
    return;
  }

  // Obtener los valores del formulario
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  const categoryId = document.getElementById('category_id').value;

  if (!categoryId) {
    alert('Por favor, selecciona una categoría.');
    return;
  }
  const parsedToken = token.replace(/['"]+/g, '');

  const formData = new FormData();
  formData.append('title', title);
  formData.append('content', content);
  formData.append('category_id', categoryId);
  formData.append('token', parsedToken);

  try {
    const response = await fetch(`${API_BASE_URL}?endpoint=create_post`, {
      method: 'POST',
      body: formData
    });

    const responseText = await response.text();

    // Verificar la respuesta
    if (responseText === 'true') {
      alert('Post creado exitosamente');
      window.location.href = 'pagina-principal.html'; 
    } else {
      alert('Error al crear el post. Intenta de nuevo.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Hubo un problema con el servidor.');
  }
});

window.onload = cargarCategorias;
