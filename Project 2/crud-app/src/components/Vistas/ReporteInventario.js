import React, { useState, useEffect } from 'react';

const ReporteInventario = () => {
    const [inventario, setInventario] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInventario = async () => {
            try {
                const response = await fetch('http://localhost:5000/reporte_inventario');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setInventario(data);
            } catch (error) {
                setError(error.toString());
                console.error('Error fetching inventario:', error);
            }
        };
        fetchInventario();
    }, []);

    return (
        <div>
            <h2>Reporte de Inventario</h2>
            {error && <p>Error: {error}</p>}
            <table>
                <thead>
                    <tr>
                        <th>ID Libro</th>
                        <th>Título</th>
                        <th>Cantidad</th>
                        <th>Estado</th>
                        <th>Fecha de Adquisición</th>
                        <th>Editorial</th>
                    </tr>
                </thead>
                <tbody>
                    {inventario.map((item) => (
                        <tr key={item.IDLibro}>
                            <td>{item.IDLibro}</td>
                            <td>{item.TituloLibro}</td>
                            <td>{item.CantidadLibros}</td>
                            <td>{item.Status}</td>
                            <td>{item.FechaAdquisicion}</td>
                            <td>{item.Editorial}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReporteInventario;
