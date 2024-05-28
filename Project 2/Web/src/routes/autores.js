// src/routes/autores.js
const express = require('express');
const router = express.Router();
const connection = require('../db');

// Ruta para crear un nuevo autor
router.post('/', (req, res) => {
    const { idPersona, editorialA } = req.body;
    const query = 'INSERT INTO Autor (IDPersona, Editorial_A) VALUES (?, ?)';
    connection.query(query, [idPersona, editorialA], (err, result) => {
        if (err) throw err;
        res.send('Autor creado exitosamente.');
    });
});

// Ruta para leer todos los autores
router.get('/', (req, res) => {
    const query = 'SELECT * FROM Autor';
    connection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Ruta para actualizar un autor
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { idPersona, editorialA } = req.body;
    const query = 'UPDATE Autor SET IDPersona = ?, Editorial_A = ? WHERE IDAutor = ?';
    connection.query(query, [idPersona, editorialA, id], (err, result) => {
        if (err) throw err;
        res.send('Autor actualizado exitosamente.');
    });
});

// Ruta para eliminar un autor
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Autor WHERE IDAutor = ?';
    connection.query(query, [id], (err, result) => {
        if (err) throw err;
        res.send('Autor eliminado exitosamente.');
    });
});

module.exports = router;
