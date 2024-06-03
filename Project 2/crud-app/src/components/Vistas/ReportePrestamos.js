import React, { useState, useEffect } from 'react';

const ReadReportePrestamos = () => {
    const [prestamos, setPrestamos] = useState([]);

    useEffect(() => {
        const fetchPrestamos = async () => {
            const response = await fetch('http://localhost:5000/reporte_prestamos');
            const data = await response.json();
            setPrestamos(data);
        };
        fetchPrestamos();
    }, []);

    return (
        <div>
            <h2>Reporte de Préstamos</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID Préstamo</th>
                        <th>Título Libro</th>
                        <th>Usuario</th>
                        <th>Fecha Préstamo</th>
                        <th>Fecha Devolución</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {prestamos.map(prestamo => (
                        <tr key={prestamo.IDPrestamo}>
                            <td>{prestamo.IDPrestamo}</td>
                            <td>{prestamo.TituloLibro}</td>
                            <td>{prestamo.Usuario}</td>
                            <td>{prestamo.FechaPrestamo}</td>
                            <td>{prestamo.FechaDevolucion}</td>
                            <td>{prestamo.Estado}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReadReportePrestamos;
