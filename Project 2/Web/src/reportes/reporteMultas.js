// src/reportes/reporteMultas.js
const express = require('express');
const router = express.Router();
const connection = require('../db');

// Ruta para obtener el reporte de multas con información de préstamos y estado
router.get('/', (req, res) => {
    const query = 'SELECT * FROM ReporteMultas';
    connection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

module.exports = router;
