import React, { useState, useEffect } from 'react';

const ReadPrestamo = () => {
    const [prestamos, setPrestamos] = useState([]);

    const fetchPrestamos = async () => {
        const response = await fetch('http://localhost:5000/prestamo');
        const data = await response.json();
        setPrestamos(data);
    };

    useEffect(() => {
        fetchPrestamos();
    }, []);

    const handleRefresh = () => {
        fetchPrestamos();
    };

    return (
        <div>
            <h2>Lista de Préstamos</h2>
            <button onClick={handleRefresh}>Actualizar lista</button>
            <ul>
                {prestamos.map(prestamo => (
                    <li key={prestamo.id_prestamo}>
                        ID Préstamo: {prestamo.id_prestamo} - ID Libro: {prestamo.id_libro} - ID Usuario: {prestamo.id_usuario} - Fecha Préstamo: {prestamo.fecha_prestamo} - Fecha Devolución: {prestamo.fecha_devolucion} - Estado: {prestamo.estado}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReadPrestamo;