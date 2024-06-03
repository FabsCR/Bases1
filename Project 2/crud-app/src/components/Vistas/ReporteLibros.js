// ./components/ReporteLibros.js
import React, { useState, useEffect } from 'react';

const ReporteLibros = () => {
    const [libros, setLibros] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLibros = async () => {
            try {
                const response = await fetch('http://localhost:5000/reporte_libros');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setLibros(data);
            } catch (error) {
                setError(error.toString());
                console.error('Error fetching libros:', error);
            }
        };
        fetchLibros();
    }, []);

    return (
        <div>
            <h2>Reporte de Libros</h2>
            {error && <p>Error: {error}</p>}
            <table>
                <thead>
                    <tr>
                        <th>ID Libro</th>
                        <th>Título</th>
                        <th>Año Publicación</th>
                        <th>Género</th>
                        <th>Editorial</th>
                        <th>Autor</th>
                    </tr>
                </thead>
                <tbody>
                    {libros.map((libro) => (
                        <tr key={libro.IDLibro}>
                            <td>{libro.IDLibro}</td>
                            <td>{libro.Titulo}</td>
                            <td>{libro.AnioPublicacion}</td>
                            <td>{libro.Genero}</td>
                            <td>{libro.Editorial}</td>
                            <td>{libro.Autor}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReporteLibros;
