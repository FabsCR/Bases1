import React, { useState, useEffect } from 'react';

const ReadInventario = () => {
    const [inventario, setInventario] = useState([]);

    const fetchInventario = async () => {
        const response = await fetch('http://localhost:5000/inventario');
        const data = await response.json();
        setInventario(data);
    };

    useEffect(() => {
        fetchInventario();
    }, []);

    const handleRefresh = () => {
        fetchInventario();
    };

    return (
        <div>
            <h2>Lista de Inventarios</h2>
            <button onClick={handleRefresh}>Actualizar lista</button>
            <ul>
                {inventario.map(item => (
                    <li key={item.id_libro}>
                        ID del Libro: {item.id_libro} - Cantidad de Libros: {item.cantidad_libros} - Status: {item.status} - Fecha de Adquisición: {item.fecha_adquisicion}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReadInventario;