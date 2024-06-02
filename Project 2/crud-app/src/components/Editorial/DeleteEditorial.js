import React, { useState } from 'react';

const DeleteEditorial = () => {
    const [nombre, setNombre] = useState('');

    const handleDelete = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/editorial/${nombre}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        console.log('Editorial eliminada:', data);
    };

    return (
        <form onSubmit={handleDelete}>
            <input
                type="text"
                placeholder="Nombre de la Editorial"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />
            <button type="submit">Eliminar Editorial</button>
        </form>
    );
};

export default DeleteEditorial;
