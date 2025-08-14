const express = require('express');
const app = express();

const logger = (options) =>
(req, res, next) => { 
  const timestamp = new Date().toISOString(); 
    const { method, url, ip } = req; 
      console.log(`${ip} -  ${options.level} ${timestamp} ${method} "${url}"`);
      next(); 
  }; 

// Middleware de análisis de cuerpo JSON
app.use(express.json());
app.use(logger({ level: 'INFO' }));

// Rutas
app.use('/categorias', require('./routes/categorias'));
app.use('/marcas', require('./routes/marcas'));
app.use('/productos', require('./routes/productos'));


const PORT = process.env.PORT || 3000;
//app.listen(PORT, () => console.log(`Servidor en ejecución en el puerto ${PORT}`));
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
  });
