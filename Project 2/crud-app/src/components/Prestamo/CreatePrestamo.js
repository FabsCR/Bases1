import React, { useState } from 'react';

const CreatePrestamo = () => {
    const [idLibro, setIdLibro] = useState('');
    const [idUsuario, setIdUsuario] = useState('');
    const [fechaPrestamo, setFechaPrestamo] = useState('');
    const [fechaDevolucion, setFechaDevolucion] = useState('');
    const [estado, setEstado] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/prestamo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_libro: idLibro, id_usuario: idUsuario, fecha_prestamo: fechaPrestamo, fecha_devolucion: fechaDevolucion, estado: estado }),
        });
        const data = await response.json();
        console.log('Préstamo creado:', data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="ID del Libro"
                value={idLibro}
                onChange={(e) => setIdLibro(e.target.value)}
            />
            <input
                type="text"
                placeholder="ID del Usuario"
                value={idUsuario}
                onChange={(e) => setIdUsuario(e.target.value)}
            />
            <input
                type="date"
                placeholder="Fecha de Préstamo"
                value={fechaPrestamo}
                onChange={(e) => setFechaPrestamo(e.target.value)}
            />
            <input
                type="date"
                placeholder="Fecha de Devolución"
                value={fechaDevolucion}
                onChange={(e) => setFechaDevolucion(e.target.value)}
            />
            <input
                type="text"
                placeholder="Estado"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
            />
            <button type="submit">Crear Préstamo</button>
        </form>
    );
};

export default CreatePrestamo;
