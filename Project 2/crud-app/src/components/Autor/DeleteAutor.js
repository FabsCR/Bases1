import React, { useState } from 'react';

const DeleteAutor = () => {
    const [idAutor, setIdAutor] = useState('');

    const handleDelete = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/autor/${idAutor}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        console.log('Autor eliminado:', data);
    };

    return (
        <form onSubmit={handleDelete}>
            <input
                type="text"
                placeholder="ID de Autor"
                value={idAutor}
                onChange={(e) => setIdAutor(e.target.value)}
            />
            <button type="submit">Eliminar Autor</button>
        </form>
    );
};

export default DeleteAutor;
