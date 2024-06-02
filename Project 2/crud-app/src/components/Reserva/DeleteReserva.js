import React, { useState } from 'react';

const DeleteReserva = () => {
    const [idReserva, setIdReserva] = useState('');

    const handleDelete = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/reserva/${idReserva}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        console.log('Reserva eliminada:', data);
    };

    return (
        <form onSubmit={handleDelete}>
            <input
                type="text"
                placeholder="ID de Reserva"
                value={idReserva}
                onChange={(e) => setIdReserva(e.target.value)}
            />
            <button type="submit">Eliminar Reserva</button>
        </form>
    );
};

export default DeleteReserva;
