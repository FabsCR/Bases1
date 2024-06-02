import React, { useState } from 'react';

const UpdatePersona = () => {
    const [codigo, setCodigo] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');

    const handleUpdate = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/persona/${codigo}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre, apellido }),
        });
        const data = await response.json();
        console.log('Persona actualizada:', data);
    };

    return (
        <form onSubmit={handleUpdate}>
            <input
                type="text"
                placeholder="Código de Persona"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
            />
            <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />
            <input
                type="text"
                placeholder="Apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
            />
            <button type="submit">Actualizar Persona</button>
        </form>
    );
};

export default UpdatePersona;
