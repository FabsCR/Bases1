import React, { useState, useEffect } from 'react';

const ReadGeneros = () => {
    const [generos, setGeneros] = useState([]);

    const fetchGeneros = async () => {
        const response = await fetch('http://localhost:5000/genero');
        const data = await response.json();
        setGeneros(data);
    };

    useEffect(() => {
        fetchGeneros();
    }, []);

    const handleRefresh = () => {
        fetchGeneros();
    };

    return (
        <div>
            <h2>Lista de Géneros</h2>
            <button onClick={handleRefresh}>Actualizar lista</button>
            <ul>
                {generos.map(genero => (
                    <li key={genero.nombre}>
                        {genero.nombre}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReadGeneros;