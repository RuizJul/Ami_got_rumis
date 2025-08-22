const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTOtxu5Fg8w-RqqI_9v0wDEWl3KHWEU48cRs4KWHWtO06NqGluY-eko3nyyYSTzfSuFXxjT5EPCu-Oc/pub?gid=0&single=true&output=csv';

fetch(sheetURL)
  .then(response => response.text())
  .then(data => {
    const rows = data.split('\n').slice(1);
    const contenedor = document.getElementById('productos');

    rows.forEach(row => {
      const [nombre, precio, imagenOriginal, descripcion] = row.split(',').map(c => c.trim());
      if (!nombre) return;

      // Transformar link de Google Drive a link directo
      let imagen = imagenOriginal;
      const driveMatch = imagen.match(/\/d\/([a-zA-Z0-9_-]+)/);
      if (driveMatch && driveMatch[1]) {
        imagen = `https://drive.google.com/uc?export=view&id=${driveMatch[1]}`;
      }

      const div = document.createElement('div');
      div.className = 'producto';
      div.innerHTML = `
        <img src="${imagen}" alt="${nombre}">
        <h3>${nombre}</h3>
        <p>${descripcion}</p>
        <strong>${precio}</strong><br>
      `;
      contenedor.appendChild(div);
    });
  })
  .catch(error => console.error('Error cargando datos:', error));
