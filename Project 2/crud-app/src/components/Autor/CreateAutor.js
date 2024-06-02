import React, { useState } from 'react';

const CreateAutor = () => {
    const [idPersona, setIdPersona] = useState('');
    const [editorial, setEditorial] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/autor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_persona: idPersona, editorial }),
        });
        const data = await response.json();
        console.log('Autor creado:', data);
    };

    return (
        <form onSubmit={handleSubmit}>
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
            <button type="submit">Crear Autor</button>
        </form>
    );
};

export default CreateAutor;
