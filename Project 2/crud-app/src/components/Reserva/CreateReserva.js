import React, { useState } from 'react';

const CreateReserva = () => {
    const [id_usuario, setIdUsuario] = useState('');
    const [id_libro, setIdLibro] = useState('');
    const [status, setStatus] = useState('');
    const [reservacion_fecha, setReservacionFecha] = useState('');

    const handleCreate = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/reserva', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_usuario, id_libro, status, reservacion_fecha }),
        });
        const data = await response.json();
        console.log('Reserva creada:', data);
    };

    return (
        <form onSubmit={handleCreate}>
            <input
                type="text"
                placeholder="ID de Usuario"
                value={id_usuario}
                onChange={(e) => setIdUsuario(e.target.value)}
            />
            <input
                type="text"
                placeholder="ID de Libro"
                value={id_libro}
                onChange={(e) => setIdLibro(e.target.value)}
            />
            <input
                type="text"
                placeholder="Estado"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            />
            <input
                type="date"
                placeholder="Fecha de Reservación"
                value={reservacion_fecha}
                onChange={(e) => setReservacionFecha(e.target.value)}
            />
            <button type="submit">Crear Reserva</button>
        </form>
    );
};

export default CreateReserva;
