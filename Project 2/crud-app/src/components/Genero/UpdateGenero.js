import React, { useState } from 'react';

const UpdateGenero = () => {
    const [nombreActual, setNombreActual] = useState('');
    const [nuevoNombre, setNuevoNombre] = useState('');

    const handleUpdate = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/genero/${nombreActual}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre: nuevoNombre }),
        });
        const data = await response.json();
        console.log('Género actualizado:', data);
    };

    return (
        <form onSubmit={handleUpdate}>
            <input
                type="text"
                placeholder="Nombre del género actual"
                value={nombreActual}
                onChange={(e) => setNombreActual(e.target.value)}
            />
            <input
                type="text"
                placeholder="Nuevo nombre del género"
                value={nuevoNombre}
                onChange={(e) => setNuevoNombre(e.target.value)}
            />
            <button type="submit">Actualizar Género</button>
        </form>
    );
};

export default UpdateGenero;
