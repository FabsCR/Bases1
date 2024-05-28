// src/reportes/reportePrestamos.js
const express = require('express');
const router = express.Router();
const connection = require('../db');

// Ruta para obtener el reporte de préstamos
router.get('/', (req, res) => {
    const query = 'SELECT * FROM ReportePrestamos';
    connection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

module.exports = router;
