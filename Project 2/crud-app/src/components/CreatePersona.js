import React, { useState } from 'react';

const CreatePersona = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/persona', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre, apellido }),
        });
        const data = await response.json();
        console.log('Persona creada:', data);
    };

    return (
        <form onSubmit={handleSubmit}>
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
            <button type="submit">Crear Persona</button>
        </form>
    );
};

export default CreatePersona;
