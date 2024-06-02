import React, { useState } from 'react';

const DeletePersona = () => {
    const [codigo, setCodigo] = useState('');

    const handleDelete = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/persona/${codigo}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        console.log('Persona eliminada:', data);
    };

    return (
        <form onSubmit={handleDelete}>
            <input
                type="text"
                placeholder="Código de Persona"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
            />
            <button type="submit">Eliminar Persona</button>
        </form>
    );
};

export default DeletePersona;
