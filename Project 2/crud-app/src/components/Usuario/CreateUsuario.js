import React, { useState } from 'react';

const CreateUsuario = () => {
    const [idPersona, setIdPersona] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/usuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_persona: idPersona, correo, telefono }),
        });
        const data = await response.json();
        console.log('Usuario creado:', data);
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
                type="email"
                placeholder="Correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
            />
            <input
                type="tel"
                placeholder="Teléfono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
            />
            <button type="submit">Crear Usuario</button>
        </form>
    );
};

export default CreateUsuario;
