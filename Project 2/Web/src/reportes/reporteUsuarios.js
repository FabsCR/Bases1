// src/reportes/reporteUsuarios.js
const express = require('express');
const router = express.Router();
const connection = require('../db');

// Ruta para obtener el reporte de usuarios con información de libros reservados y fecha de reserva
router.get('/', (req, res) => {
    const query = 'SELECT * FROM ReporteUsuarios';
    connection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

module.exports = router;
