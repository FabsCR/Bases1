import React, { useState } from 'react';

const UpdateReserva = () => {
    const [idReserva, setIdReserva] = useState('');
    const [status, setStatus] = useState('');
    const [reservacionFecha, setReservacionFecha] = useState(''); // Nuevo estado para la fecha de reservación

    const handleUpdate = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/reserva/${idReserva}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status, reservacion_fecha: reservacionFecha }), // Envía la fecha de reservación al backend
        });
        const data = await response.json();
        console.log('Reserva actualizada:', data);
    };

    return (
        <form onSubmit={handleUpdate}>
            <input
                type="text"
                placeholder="ID de Reserva"
                value={idReserva}
                onChange={(e) => setIdReserva(e.target.value)}
            />
            <input
                type="text"
                placeholder="Nuevo Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            />
            <input
                type="date"
                placeholder="Nueva Fecha de Reservación"
                value={reservacionFecha}
                onChange={(e) => setReservacionFecha(e.target.value)}
            />
            <button type="submit">Actualizar Reserva</button>
        </form>
    );
};

export default UpdateReserva;
