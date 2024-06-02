import React, { useState } from 'react';

const DeleteUsuario = () => {
    const [idUsuario, setIdUsuario] = useState('');

    const handleDelete = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/usuario/${idUsuario}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        console.log('Usuario eliminado:', data);
    };

    return (
        <form onSubmit={handleDelete}>
            <input
                type="text"
                placeholder="ID de Usuario"
                value={idUsuario}
                onChange={(e) => setIdUsuario(e.target.value)}
            />
            <button type="submit">Eliminar Usuario</button>
        </form>
    );
};

export default DeleteUsuario;
