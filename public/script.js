// URL del CSV publicado de Google Sheets
const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTOtxu5Fg8w-RqqI_9v0wDEWl3KHWEU48cRs4KWHWtO06NqGluY-eko3nyyYSTzfSuFXxjT5EPCu-Oc/pub?gid=0&single=true&output=csv';

// Leer CSV con PapaParse
Papa.parse(sheetURL, {
  download: true,
  header: true,
  complete: function(results) {
    const contenedor = document.getElementById('productos');

    results.data.forEach(producto => {
      if (!producto.Nombre) return; // Ignorar filas vacías

      // Construir ruta de imagen desde GitHub
      const imagen = producto.Imagen ? `img/${producto.Imagen.trim()}` : 'img/placeholder.png';

      // Crear tarjeta de producto
      const div = document.createElement('div');
      div.className = 'producto';
      div.innerHTML = `
        <img src="${imagen}" alt="${producto.Nombre}">
        <h3>${producto.Nombre}</h3>
        <p>${producto.Descripcion}</p>
        <strong>${producto.Precio}</strong>
      `;
      contenedor.appendChild(div);
    });
  },
  error: function(err) {
    console.error('Error cargando CSV:', err);
  }
});
