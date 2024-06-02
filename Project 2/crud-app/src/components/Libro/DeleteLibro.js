import React, { useState } from 'react';

const DeleteLibro = () => {
    const [idLibro, setIdLibro] = useState('');

    const handleDelete = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/libro/${idLibro}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        console.log('Libro eliminado:', data);
    };

    return (
        <form onSubmit={handleDelete}>
            <input
                type="text"
                placeholder="ID de Libro"
                value={idLibro}
                onChange={(e) => setIdLibro(e.target.value)}
            />
            <button type="submit">Eliminar Libro</button>
        </form>
    );
};

export default DeleteLibro;
