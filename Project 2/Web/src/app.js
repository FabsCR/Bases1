const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const personasRoutes = require('./routes/personas');
const editorialesRoutes = require('./routes/editoriales');
const autoresRoutes = require('./routes/autores');
const usuariosRoutes = require('./routes/usuarios');
const generosRoutes = require('./routes/generos');
const librosRoutes = require('./routes/libros');
const inventariosRoutes = require('./routes/inventarios');
const prestamosRoutes = require('./routes/prestamos');
const reservasRoutes = require('./routes/reservas'); 
const multasRoutes = require('./routes/multas'); 
const reporteLibrosRoutes = require('./reportes/reporteLibros');
const reportePrestamosRoutes = require('./reportes/reportePrestamos');
const reporteInventarioRoutes = require('./reportes/reporteInventario');
const reporteUsuariosRoutes = require('./reportes/reporteUsuarios'); 
const reporteMultasRoutes = require('./reportes/reporteMultas');

const app = express();

app.use(cors()); // Usar cors
app.use(bodyParser.json());

// Configuración de las rutas
app.use('/api/personas', personasRoutes);
app.use('/api/editoriales', editorialesRoutes);
app.use('/api/autores', autoresRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/generos', generosRoutes);
app.use('/api/libros', librosRoutes);
app.use('/api/inventarios', inventariosRoutes);
app.use('/api/prestamos', prestamosRoutes);
app.use('/api/reservas', reservasRoutes); 
app.use('/api/multas', multasRoutes); 
app.use('/api/reportes/libros', reporteLibrosRoutes);
app.use('/api/reportes/prestamos', reportePrestamosRoutes);
app.use('/api/reportes/inventario', reporteInventarioRoutes);
app.use('/api/reportes/usuarios', reporteUsuariosRoutes); 
app.use('/api/reportes/multas', reporteMultasRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});