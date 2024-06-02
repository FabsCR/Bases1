import React, { useState } from 'react';

const UpdatePrestamo = () => {
    const [idPrestamo, setIdPrestamo] = useState('');
    const [idLibro, setIdLibro] = useState('');
    const [idUsuario, setIdUsuario] = useState('');
    const [fechaPrestamo, setFechaPrestamo] = useState('');
    const [fechaDevolucion, setFechaDevolucion] = useState('');
    const [estado, setEstado] = useState('');

    const handleUpdate = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/prestamo/${idPrestamo}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_libro: idLibro, id_usuario: idUsuario, fecha_prestamo: fechaPrestamo, fecha_devolucion: fechaDevolucion, estado: estado }),
        });
        const data = await response.json();
        console.log('Préstamo actualizado:', data);
    };

    return (
        <form onSubmit={handleUpdate}>
            <input
                type="text"
                placeholder="ID del Préstamo"
                value={idPrestamo}
                onChange={(e) => setIdPrestamo(e.target.value)}
            />
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
            <button type="submit">Actualizar Préstamo</button>
        </form>
    );
};

export default UpdatePrestamo;
