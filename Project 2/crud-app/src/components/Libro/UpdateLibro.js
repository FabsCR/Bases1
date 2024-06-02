import React, { useState } from 'react';

const UpdateLibro = () => {
    const [idLibro, setIdLibro] = useState('');
    const [titulo, setTitulo] = useState('');
    const [anioPublicacion, setAnioPublicacion] = useState('');
    const [genero, setGenero] = useState('');
    const [editorial, setEditorial] = useState('');
    const [autor, setAutor] = useState('');

    const handleUpdate = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/libro/${idLibro}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ titulo, anio_publicacion: anioPublicacion, genero, editorial, autor }),
        });
        const data = await response.json();
        console.log('Libro actualizado:', data);
    };

    return (
        <form onSubmit={handleUpdate}>
            <input
                type="text"
                placeholder="ID de Libro"
                value={idLibro}
                onChange={(e) => setIdLibro(e.target.value)}
            />
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
            <button type="submit">Actualizar Libro</button>
        </form>
    );
};

export default UpdateLibro;
