import React, { useState } from 'react';

const UpdateAutor = () => {
    const [idAutor, setIdAutor] = useState('');
    const [idPersona, setIdPersona] = useState('');
    const [editorial, setEditorial] = useState('');

    const handleUpdate = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/autor/${idAutor}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_persona: idPersona, editorial }),
        });
        const data = await response.json();
        console.log('Autor actualizado:', data);
    };

    return (
        <form onSubmit={handleUpdate}>
            <input
                type="text"
                placeholder="ID de Autor"
                value={idAutor}
                onChange={(e) => setIdAutor(e.target.value)}
            />
            <input
                type="text"
                placeholder="ID de Persona"
                value={idPersona}
                onChange={(e) => setIdPersona(e.target.value)}
            />
            <input
                type="text"
                placeholder="Editorial"
                value={editorial}
                onChange={(e) => setEditorial(e.target.value)}
            />
            <button type="submit">Actualizar Autor</button>
        </form>
    );
};

export default UpdateAutor;
