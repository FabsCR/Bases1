import React, { useState, useEffect } from 'react';

const ReadEditorial = () => {
    const [editoriales, setEditoriales] = useState([]);

    useEffect(() => {
        const fetchEditoriales = async () => {
            const response = await fetch('http://localhost:5000/editorial');
            const data = await response.json();
            setEditoriales(data);
        };
        fetchEditoriales();
    }, []);

    return (
        <div>
            <h2>Lista de Editoriales</h2>
            <ul>
                {editoriales.map(editorial => (
                    <li key={editorial.nombre}>
                        {editorial.nombre} - {editorial.pais}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReadEditorial;
