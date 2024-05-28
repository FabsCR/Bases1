// src/db.js
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Cambia esto si tienes un usuario diferente
    password: '', // Añade tu contraseña si es necesario
    database: 'proyecto_basededatos1',
    port: 3306
});

connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos: ' + err.stack);
        return;
    }
    console.log('Conectado a la base de datos.');
});

module.exports = connection;
