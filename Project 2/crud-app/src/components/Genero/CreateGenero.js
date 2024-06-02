import React, { useState } from 'react';

const CreateGenero = () => {
    const [nombre, setNombre] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/genero', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre }),
        });
        const data = await response.json();
        console.log('Género creado:', data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Nombre del género"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />
            <button type="submit">Crear Género</button>
        </form>
    );
};

export default CreateGenero;
