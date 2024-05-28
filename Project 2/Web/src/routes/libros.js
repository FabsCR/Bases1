// src/routes/libros.js
const express = require('express');
const router = express.Router();
const connection = require('../db');

// Ruta para crear un nuevo libro
router.post('/', (req, res) => {
    const { titulo, isbn, editorial, genero } = req.body;
    const query = 'INSERT INTO Libro (Titulo, ISBN, Editorial, Genero) VALUES (?, ?, ?, ?)';
    connection.query(query, [titulo, isbn, editorial, genero], (err, result) => {
        if (err) throw err;
        res.send('Libro creado exitosamente.');
    });
});

// Ruta para leer todos los libros
router.get('/', (req, res) => {
    const query = 'SELECT * FROM Libro';
    connection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Ruta para actualizar un libro
router.put('/:isbn', (req, res) => {
    const { isbn } = req.params;
    const { titulo, editorial, genero } = req.body;
    const query = 'UPDATE Libro SET Titulo = ?, Editorial = ?, Genero = ? WHERE ISBN = ?';
    connection.query(query, [titulo, editorial, genero, isbn], (err, result) => {
        if (err) throw err;
        res.send('Libro actualizado exitosamente.');
    });
});

// Ruta para eliminar un libro
router.delete('/:isbn', (req, res) => {
    const { isbn } = req.params;
    const query = 'DELETE FROM Libro WHERE ISBN = ?';
    connection.query(query, [isbn], (err, result) => {
        if (err) throw err;
        res.send('Libro eliminado exitosamente.');
    });
});

module.exports = router;
