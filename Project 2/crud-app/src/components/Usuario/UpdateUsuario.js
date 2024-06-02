import React, { useState } from 'react';

const UpdateUsuario = () => {
    const [idUsuario, setIdUsuario] = useState('');
    const [idPersona, setIdPersona] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');

    const handleUpdate = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/usuario/${idUsuario}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_persona: idPersona, correo, telefono }),
        });
        const data = await response.json();
        console.log('Usuario actualizado:', data);
    };

    return (
        <form onSubmit={handleUpdate}>
            <input
                type="text"
                placeholder="ID de Usuario"
                value={idUsuario}
                onChange={(e) => setIdUsuario(e.target.value)}
            />
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
            <button type="submit">Actualizar Usuario</button>
        </form>
    );
};

export default UpdateUsuario;
