import React, { useState, useEffect } from 'react';

const ReadReserva = () => {
    const [reservas, setReservas] = useState([]);

    const fetchReservas = async () => {
        const response = await fetch('http://localhost:5000/reserva');
        const data = await response.json();
        setReservas(data);
    };

    useEffect(() => {
        fetchReservas();
    }, []);

    const handleRefresh = () => {
        fetchReservas();
    };

    return (
        <div>
            <h2>Lista de Reservas</h2>
            <button onClick={handleRefresh}>Actualizar lista</button>
            <ul>
                {reservas.map(reserva => (
                    <li key={reserva.IDReserva}>
                        ID: {reserva.IDReserva} - Usuario: {reserva.IDUsuario} - Libro: {reserva.IDLibro} - Status: {reserva.Status} - Fecha de Reservación: {reserva.ReservacionFecha}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReadReserva;