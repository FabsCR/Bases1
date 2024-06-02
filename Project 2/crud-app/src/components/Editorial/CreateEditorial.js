import React, { useState } from 'react';

const CreateEditorial = () => {
    const [nombre, setNombre] = useState('');
    const [pais, setPais] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/editorial', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre, pais }),
        });
        const data = await response.json();
        console.log('Editorial creada:', data);
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
                placeholder="País"
                value={pais}
                onChange={(e) => setPais(e.target.value)}
            />
            <button type="submit">Crear Editorial</button>
        </form>
    );
};

export default CreateEditorial;
