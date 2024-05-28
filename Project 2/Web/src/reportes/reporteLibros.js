// src/reportes/reporteLibros.js
const express = require('express');
const router = express.Router();
const connection = require('../db');

// Ruta para obtener el reporte de libros
router.get('/', (req, res) => {
    const query = 'SELECT * FROM ReporteLibros';
    connection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

module.exports = router;
