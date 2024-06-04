import React, { useState, useEffect } from 'react';

const ReadLibros = () => {
    const [libros, setLibros] = useState([]);

    const fetchLibros = async () => {
        const response = await fetch('http://localhost:5000/libro');
        const data = await response.json();
        setLibros(data);
    };

    useEffect(() => {
        fetchLibros();
    }, []);

    const handleRefresh = () => {
        fetchLibros();
    };

    return (
        <div>
            <h2>Lista de Libros</h2>
            <button onClick={handleRefresh}>Actualizar lista</button>
            <ul>
                {libros.map(libro => (
                    <li key={libro.id_libro}>
                        {libro.titulo} - {libro.anio_publicacion} - {libro.genero} - {libro.editorial} - ID Libro: {libro.id_libro} - ID Autor: {libro.autor}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReadLibros;