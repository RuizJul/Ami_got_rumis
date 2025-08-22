const contenedor = document.getElementById('productos');

const productos = [
  {
    nombre: 'Amigurumi 1',
    precio: '$15.00',
    descripcion: 'Amigurumi vaca',
    imagen: 'https://via.placeholder.com/200'
  },
  {
    nombre: 'Amigurumi 2',
    precio: '$15.00',
    descripcion: 'Amigurumi gato',
    imagen: 'https://via.placeholder.com/200'
  }
];

productos.forEach(producto => {
  const div = document.createElement('div');
  div.className = 'producto';
  div.innerHTML = `
    <img src="${producto.imagen}" alt="${producto.nombre}">
    <h3>${producto.nombre}</h3>
    <p>${producto.descripcion}</p>
    <strong>${producto.precio}</strong>
  `;
  contenedor.appendChild(div);
});
