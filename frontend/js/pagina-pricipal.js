const API_BASE_URL = 'http://localhost/prueba-desarrollador-fullstack/api/index.php';
// Función para cargar las categorías
async function cargarCategorias() {
  try {
    // Solicitar las categorías
    const response = await fetch(`${API_BASE_URL}?endpoint=get_categories`, {
      method: 'GET'
    });

    const responseText = await response.text(); 
    const categories = JSON.parse(responseText);  
    console.log(categories);
    if (categories && categories.length > 0) {
      return categories;
    } else {
      alert('No se encontraron categorías.');
      return [];
    }
  } catch (error) {
    console.error('Error al cargar categorías:', error);
    alert('Hubo un problema al cargar las categorías.');
    return [];
  }
}

// Función para cargar los posts de una categoría
async function cargarPosts(categoryId) {
  try {
    // Solicitar los posts de una categoría
    const response = await fetch(`${API_BASE_URL}?endpoint=get_posts&category_id=${categoryId}`, {
      method: 'GET'
    });

    const responseText = await response.text();  
    const posts = JSON.parse(responseText);  

    if (posts && posts.length > 0) {
      return posts;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error al cargar los posts:', error);
    alert('Hubo un problema al cargar los posts.');
    return [];
  }
}

// Función para cargar categorías y sus posts
async function cargarCategoriasYPosts() {
  const categories = await cargarCategorias();
  
  // Verificar si hay categorías
  if (categories.length > 0) {
    const categoriesContainer = document.getElementById('categoriesContainer');
    
    for (const category of categories) {
      const posts = await cargarPosts(category.id);

      const categoryCard = document.createElement('div');
      categoryCard.classList.add('col-md-4', 'mb-4');
      categoryCard.innerHTML = `
        <div class="card">
          <div class="card-header">
            <h5>${category.name}</h5>
          </div>
          <div class="card-body">
            <h6>Posts:</h6>
            <ul class="list-group">
              ${posts.map(post => `
                <li class="list-group-item">
                  <strong>${post.title}</strong><br>
                  ${post.content}
                </li>
              `).join('')}
            </ul>
          </div>
        </div>
      `;
      categoriesContainer.appendChild(categoryCard);
    }
  }
}

// Función para manejar el logout
document.getElementById('logoutButton')?.addEventListener('click', () => {
  localStorage.removeItem('authToken');
  window.location.href = 'index.html';
});



// Cargar los datos al cargar la página
window.onload = () => {
  cargarCategoriasYPosts();
};
