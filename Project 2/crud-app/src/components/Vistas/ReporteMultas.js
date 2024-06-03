import React, { useState, useEffect } from 'react';

const ReadReporteMultas = () => {
    const [multas, setMultas] = useState([]);

    useEffect(() => {
        const fetchMultas = async () => {
            const response = await fetch('http://localhost:5000/reporte_multas');
            const data = await response.json();
            setMultas(data);
        };
        fetchMultas();
    }, []);

    return (
        <div>
            <h2>Reporte de Multas</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID Multa</th>
                        <th>ID Préstamo</th>
                        <th>Título Libro</th>
                        <th>Usuario</th>
                        <th>Monto</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {multas.map(multa => (
                        <tr key={multa.IDMulta}>
                            <td>{multa.IDMulta}</td>
                            <td>{multa.IDPrestamo}</td>
                            <td>{multa.TituloLibro}</td>
                            <td>{multa.Usuario}</td>
                            <td>{multa.Monto}</td>
                            <td>{multa.Estado}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReadReporteMultas;
