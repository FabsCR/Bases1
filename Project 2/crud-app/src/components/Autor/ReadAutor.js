import React, { useState, useEffect } from 'react';

const ReadAutores = () => {
    const [autores, setAutores] = useState([]);

    useEffect(() => {
        const fetchAutores = async () => {
            const response = await fetch('http://localhost:5000/autor');
            const data = await response.json();
            setAutores(data);
        };
        fetchAutores();
    }, []);

    return (
        <div>
            <h2>Lista de Autores</h2>
            <ul>
                {autores.map(autor => (
                    <li key={autor.id_autor}>
                        ID de Autor: {autor.id_autor}, ID de Persona: {autor.id_persona}, Editorial: {autor.editorial}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReadAutores;
