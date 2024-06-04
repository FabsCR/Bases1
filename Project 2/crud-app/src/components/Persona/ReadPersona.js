import React, { useState, useEffect } from 'react';

const ReadPersona = () => {
    const [personas, setPersonas] = useState([]);

    const fetchPersonas = async () => {
        const response = await fetch('http://localhost:5000/persona');
        const data = await response.json();
        setPersonas(data);
    };

    useEffect(() => {
        fetchPersonas();
    }, []);

    const handleRefresh = () => {
        fetchPersonas();
    };

    return (
        <div>
            <h2>Lista de Personas</h2>
            <button onClick={handleRefresh}>Actualizar lista</button>
            <ul>
                {personas.map(persona => (
                    <li key={persona.codigoPersona}>
                        {persona.codigoPersona}: {persona.nombre} {persona.apellido}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReadPersona;
