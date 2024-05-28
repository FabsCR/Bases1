// src/routes/inventarios.js
const express = require('express');
const router = express.Router();
const connection = require('../db');

// Ruta para crear un nuevo inventario
router.post('/', (req, res) => {
    const { idLibro, cantidad } = req.body;
    const query = 'INSERT INTO Inventario (IDLibro, Cantidad) VALUES (?, ?)';
    connection.query(query, [idLibro, cantidad], (err, result) => {
        if (err) throw err;
        res.send('Inventario creado exitosamente.');
    });
});

// Ruta para leer todos los inventarios
router.get('/', (req, res) => {
    const query = 'SELECT * FROM Inventario';
    connection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Ruta para actualizar un inventario
router.put('/:idLibro', (req, res) => {
    const { idLibro } = req.params;
    const { cantidad } = req.body;
    const query = 'UPDATE Inventario SET Cantidad = ? WHERE IDLibro = ?';
    connection.query(query, [cantidad, idLibro], (err, result) => {
        if (err) throw err;
        res.send('Inventario actualizado exitosamente.');
    });
});

// Ruta para eliminar un inventario
router.delete('/:idLibro', (req, res) => {
    const { idLibro } = req.params;
    const query = 'DELETE FROM Inventario WHERE IDLibro = ?';
    connection.query(query, [idLibro], (err, result) => {
        if (err) throw err;
        res.send('Inventario eliminado exitosamente.');
    });
});

module.exports = router;
