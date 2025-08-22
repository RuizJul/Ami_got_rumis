const express = require('express');
const fetch = require('node-fetch'); // npm install node-fetch
const app = express();
const PORT = process.env.PORT || 3000;

// Servir archivos estáticos
app.use(express.static('public'));

// Endpoint para productos
app.get('/api/productos', async (req, res) => {
  try {
    const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTOtxu5Fg8w-RqqI_9v0wDEWl3KHWEU48cRs4KWHWtO06NqGluY-eko3nyyYSTzfSuFXxjT5EPCu-Oc/pub?gid=0&single=true&output=csv';
    const response = await fetch(sheetURL);
    const csvText = await response.text();

    const rows = csvText.split('\n').slice(1); // saltar encabezado
    const productos = rows.map(row => {
      const [nombre, precio, imagenOriginal, descripcion] = row.split(',').map(c => c.trim());

      if (!nombre) return null;

      // Transformar link de Google Drive a link directo
      let imagen = imagenOriginal;
      const driveMatch = imagen.match(/\/d\/([a-zA-Z0-9_-]+)/);
      if (driveMatch && driveMatch[1]) {
        imagen = `https://drive.google.com/uc?export=view&id=${driveMatch[1]}`;
      }

      return { nombre, precio, descripcion, imagen };
    }).filter(Boolean);

    res.json(productos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'No se pudo cargar el CSV' });
  }
});

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
