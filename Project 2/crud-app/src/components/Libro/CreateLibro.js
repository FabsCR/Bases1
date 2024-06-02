import React, { useState } from 'react';

const CreateLibro = () => {
    const [titulo, setTitulo] = useState('');
    const [anioPublicacion, setAnioPublicacion] = useState('');
    const [genero, setGenero] = useState('');
    const [editorial, setEditorial] = useState('');
    const [autor, setAutor] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/libro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ titulo, anio_publicacion: anioPublicacion, genero, editorial, autor }),
        });
        const data = await response.json();
        console.log('Libro creado:', data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Título"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
            />
            <input
                type="text"
                placeholder="Año de Publicación"
                value={anioPublicacion}
                onChange={(e) => setAnioPublicacion(e.target.value)}
            />
            <input
                type="text"
                placeholder="Género"
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
            />
            <input
                type="text"
                placeholder="Editorial"
                value={editorial}
                onChange={(e) => setEditorial(e.target.value)}
            />
            <input
                type="text"
                placeholder="ID de Autor"
                value={autor}
                onChange={(e) => setAutor(e.target.value)}
            />
            <button type="submit">Crear Libro</button>
        </form>
    );
};

export default CreateLibro;
