// src/reportes/reporteInventario.js
const express = require('express');
const router = express.Router();
const connection = require('../db');

// Ruta para obtener el reporte de inventario
router.get('/', (req, res) => {
    const query = 'SELECT * FROM ReporteInventario';
    connection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

module.exports = router;
