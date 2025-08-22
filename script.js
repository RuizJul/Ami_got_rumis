const sheetURL = 'https:/https://docs.google.com/spreadsheets/d/e/2PACX-1vTOtxu5Fg8w-RqqI_9v0wDEWl3KHWEU48cRs4KWHWtO06NqGluY-eko3nyyYSTzfSuFXxjT5EPCu-Oc/pub?gid=0&single=true&output=csvdocs.google.com/spreadsheets/d/1S6TSRPI93d6MjCbs8Kde3um0UhIJ0YJlA61ZZTY3cvY/edit?usp=sharing'; // reemplaza con tu link de publicación de Google Sheets

fetch(sheetURL)
  .then(response => response.text())
  .then(data => {
    const rows = data.split('\n').slice(1); // quitar encabezado
    const contenedor = document.getElementById('productos');

    rows.forEach(row => {
      const [nombre, precio, imagenOriginal, descripcion] = row.split(',');

      if (!nombre) return;

      // Transformar link de Google Drive a link directo
      let imagen = imagenOriginal.trim();
      const driveMatch = imagen.match(/\/d\/(.*?)\//);
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
