// src/routes/reservas.js
const express = require('express');
const router = express.Router();
const connection = require('../db');

// Ruta para crear una nueva reserva
router.post('/', (req, res) => {
    const { idUsuario, idLibro, status, reservacionFecha } = req.body;
    const query = 'INSERT INTO Reserva (IDUsuario, IDLibro, Status, ReservacionFecha) VALUES (?, ?, ?, ?)';
    connection.query(query, [idUsuario, idLibro, status, reservacionFecha], (err, result) => {
        if (err) throw err;
        res.send('Reserva creada exitosamente.');
    });
});

// Ruta para leer todas las reservas
router.get('/', (req, res) => {
    const query = 'SELECT * FROM Reserva';
    connection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Ruta para actualizar una reserva
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { idUsuario, idLibro, status, reservacionFecha } = req.body;
    const query = 'UPDATE Reserva SET IDUsuario = ?, IDLibro = ?, Status = ?, ReservacionFecha = ? WHERE IDReserva = ?';
    connection.query(query, [idUsuario, idLibro, status, reservacionFecha, id], (err, result) => {
        if (err) throw err;
        res.send('Reserva actualizada exitosamente.');
    });
});

// Ruta para eliminar una reserva
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Reserva WHERE IDReserva = ?';
    connection.query(query, [id], (err, result) => {
        if (err) throw err;
        res.send('Reserva eliminada exitosamente.');
    });
});

module.exports = router;
