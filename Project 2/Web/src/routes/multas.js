// src/routes/multas.js
const express = require('express');
const router = express.Router();
const connection = require('../db');

// Ruta para crear una nueva multa
router.post('/', (req, res) => {
    const { idPrestamo, monto, estado } = req.body;
    const query = 'INSERT INTO Multa (IDPrestamo, Monto, Estado) VALUES (?, ?, ?)';
    connection.query(query, [idPrestamo, monto, estado], (err, result) => {
        if (err) throw err;
        res.send('Multa creada exitosamente.');
    });
});

// Ruta para leer todas las multas
router.get('/', (req, res) => {
    const query = 'SELECT * FROM Multa';
    connection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Ruta para actualizar una multa
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { idPrestamo, monto, estado } = req.body;
    const query = 'UPDATE Multa SET IDPrestamo = ?, Monto = ?, Estado = ? WHERE IDMulta = ?';
    connection.query(query, [idPrestamo, monto, estado, id], (err, result) => {
        if (err) throw err;
        res.send('Multa actualizada exitosamente.');
    });
});

// Ruta para eliminar una multa
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Multa WHERE IDMulta = ?';
    connection.query(query, [id], (err, result) => {
        if (err) throw err;
        res.send('Multa eliminada exitosamente.');
    });
});

module.exports = router;
