// src/routes/editoriales.js
const express = require('express');
const router = express.Router();
const connection = require('../db');

// Ruta para crear una nueva editorial
router.post('/', (req, res) => {
    const { nombre, pais } = req.body;
    const query = 'INSERT INTO Editorial (Nombre, Pais) VALUES (?, ?)';
    connection.query(query, [nombre, pais], (err, result) => {
        if (err) throw err;
        res.send('Editorial creada exitosamente.');
    });
});

// Ruta para leer todas las editoriales
router.get('/', (req, res) => {
    const query = 'SELECT * FROM Editorial';
    connection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Ruta para actualizar una editorial
router.put('/:nombre', (req, res) => {
    const { nombre } = req.params;
    const { pais } = req.body;
    const query = 'UPDATE Editorial SET Pais = ? WHERE Nombre = ?';
    connection.query(query, [pais, nombre], (err, result) => {
        if (err) throw err;
        res.send('Editorial actualizada exitosamente.');
    });
});

// Ruta para eliminar una editorial
router.delete('/:nombre', (req, res) => {
    const { nombre } = req.params;
    const query = 'DELETE FROM Editorial WHERE Nombre = ?';
    connection.query(query, [nombre], (err, result) => {
        if (err) throw err;
        res.send('Editorial eliminada exitosamente.');
    });
});

module.exports = router;
