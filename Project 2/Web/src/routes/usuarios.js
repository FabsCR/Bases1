// src/routes/usuarios.js
const express = require('express');
const router = express.Router();
const connection = require('../db');

// Ruta para crear un nuevo usuario
router.post('/', (req, res) => {
    const { idPersona, correo, telefono } = req.body;
    const query = 'INSERT INTO Usuario (IDPersona, Correo, Telefono) VALUES (?, ?, ?)';
    connection.query(query, [idPersona, correo, telefono], (err, result) => {
        if (err) throw err;
        res.send('Usuario creado exitosamente.');
    });
});

// Ruta para leer todos los usuarios
router.get('/', (req, res) => {
    const query = 'SELECT * FROM Usuario';
    connection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Ruta para actualizar un usuario
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { idPersona, correo, telefono } = req.body;
    const query = 'UPDATE Usuario SET IDPersona = ?, Correo = ?, Telefono = ? WHERE IDUsuario = ?';
    connection.query(query, [idPersona, correo, telefono, id], (err, result) => {
        if (err) throw err;
        res.send('Usuario actualizado exitosamente.');
    });
});

// Ruta para eliminar un usuario
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Usuario WHERE IDUsuario = ?';
    connection.query(query, [id], (err, result) => {
        if (err) throw err;
        res.send('Usuario eliminado exitosamente.');
    });
});

module.exports = router;
