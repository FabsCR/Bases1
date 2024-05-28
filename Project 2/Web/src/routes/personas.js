// src/routes/personas.js
const express = require('express');
const router = express.Router();
const connection = require('../db');

// Ruta para crear una nueva persona
router.post('/', (req, res) => {
    const { nombre, apellido } = req.body;
    const query = 'INSERT INTO Persona (Nombre, Apellido) VALUES (?, ?)';
    connection.query(query, [nombre, apellido], (err, result) => {
        if (err) throw err;
        res.send('Persona creada exitosamente.');
    });
});

// Ruta para leer todas las personas
router.get('/', (req, res) => {
    const query = 'SELECT * FROM Persona';
    connection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Ruta para actualizar una persona
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, apellido } = req.body;
    const query = 'UPDATE Persona SET Nombre = ?, Apellido = ? WHERE codigoPersona = ?';
    connection.query(query, [nombre, apellido, id], (err, result) => {
        if (err) throw err;
        res.send('Persona actualizada exitosamente.');
    });
});

// Ruta para eliminar una persona
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Persona WHERE codigoPersona = ?';
    connection.query(query, [id], (err, result) => {
        if (err) throw err;
        res.send('Persona eliminada exitosamente.');
    });
});

module.exports = router;
