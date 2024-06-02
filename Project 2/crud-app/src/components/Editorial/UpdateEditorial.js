import React, { useState } from 'react';

const UpdateEditorial = () => {
    const [nombre, setNombre] = useState('');
    const [pais, setPais] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/editorial/${nombre}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ pais }),
        });
        const data = await response.json();
        console.log('Editorial actualizada:', data);
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
            <button type="submit">Actualizar Editorial</button>
        </form>
    );
};

export default UpdateEditorial;
