// src/routes/generos.js
const express = require('express');
const router = express.Router();
const connection = require('../db');

// Ruta para crear un nuevo género
router.post('/', (req, res) => {
    const { nombre } = req.body;
    const query = 'INSERT INTO Genero (Nombre) VALUES (?)';
    connection.query(query, [nombre], (err, result) => {
        if (err) throw err;
        res.send('Género creado exitosamente.');
    });
});

// Ruta para leer todos los géneros
router.get('/', (req, res) => {
    const query = 'SELECT * FROM Genero';
    connection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Ruta para actualizar un género
router.put('/:nombre', (req, res) => {
    const { nombre } = req.params;
    const { nuevoNombre } = req.body;
    const query = 'UPDATE Genero SET Nombre = ? WHERE Nombre = ?';
    connection.query(query, [nuevoNombre, nombre], (err, result) => {
        if (err) throw err;
        res.send('Género actualizado exitosamente.');
    });
});

// Ruta para eliminar un género
router.delete('/:nombre', (req, res) => {
    const { nombre } = req.params;
    const query = 'DELETE FROM Genero WHERE Nombre = ?';
    connection.query(query, [nombre], (err, result) => {
        if (err) throw err;
        res.send('Género eliminado exitosamente.');
    });
});

module.exports = router;
