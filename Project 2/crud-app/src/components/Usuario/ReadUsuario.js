import React, { useState, useEffect } from 'react';

const ReadUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);

    const fetchUsuarios = async () => {
        const response = await fetch('http://localhost:5000/usuario');
        const data = await response.json();
        setUsuarios(data);
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const handleRefresh = () => {
        fetchUsuarios();
    };

    return (
        <div>
            <h2>Lista de Usuarios</h2>
            <button onClick={handleRefresh}>Actualizar lista</button>
            <ul>
                {usuarios.map(usuario => (
                    <li key={usuario.id_usuario}>
                        ID de Usuario: {usuario.id_usuario}, ID de Persona: {usuario.id_persona}, Correo: {usuario.correo}, Teléfono: {usuario.telefono}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReadUsuarios;