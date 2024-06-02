import React, { useState } from 'react';

const DeleteGenero = () => {
    const [nombre, setNombre] = useState('');

    const handleDelete = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/genero/${nombre}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        console.log('Género eliminado:', data);
    };

    return (
        <form onSubmit={handleDelete}>
            <input
                type="text"
                placeholder="Nombre del género"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />
            <button type="submit">Eliminar Género</button>
        </form>
    );
};

export default DeleteGenero;
