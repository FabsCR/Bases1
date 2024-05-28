// src/routes/prestamos.js
const express = require('express');
const router = express.Router();
const connection = require('../db');

// Ruta para crear un nuevo préstamo
router.post('/', (req, res) => {
    const { idUsuario, idLibro, fechaPrestamo, fechaDevolucion } = req.body;
    const query = 'INSERT INTO Prestamo (IDUsuario, IDLibro, FechaPrestamo, FechaDevolucion) VALUES (?, ?, ?, ?)';
    connection.query(query, [idUsuario, idLibro, fechaPrestamo, fechaDevolucion], (err, result) => {
        if (err) throw err;
        res.send('Préstamo creado exitosamente.');
    });
});

// Ruta para leer todos los préstamos
router.get('/', (req, res) => {
    const query = 'SELECT * FROM Prestamo';
    connection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Ruta para actualizar un préstamo
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { idUsuario, idLibro, fechaPrestamo, fechaDevolucion } = req.body;
    const query = 'UPDATE Prestamo SET IDUsuario = ?, IDLibro = ?, FechaPrestamo = ?, FechaDevolucion = ? WHERE IDPrestamo = ?';
    connection.query(query, [idUsuario, idLibro, fechaPrestamo, fechaDevolucion, id], (err, result) => {
        if (err) throw err;
        res.send('Préstamo actualizado exitosamente.');
    });
});

// Ruta para eliminar un préstamo
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Prestamo WHERE IDPrestamo = ?';
    connection.query(query, [id], (err, result) => {
        if (err) throw err;
        res.send('Préstamo eliminado exitosamente.');
    });
});

module.exports = router;
