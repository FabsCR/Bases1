import React, { useState } from 'react';

const CreateInventario = () => {
    const [idLibro, setIdLibro] = useState('');
    const [cantidadLibros, setCantidadLibros] = useState('');
    const [status, setStatus] = useState('');
    const [fechaAdquisicion, setFechaAdquisicion] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/inventario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_libro: idLibro, cantidad_libros: cantidadLibros, status: status, fecha_adquisicion: fechaAdquisicion }),
        });
        const data = await response.json();
        console.log('Registro de inventario creado:', data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="ID del Libro"
                value={idLibro}
                onChange={(e) => setIdLibro(e.target.value)}
            />
            <input
                type="text"
                placeholder="Cantidad de Libros"
                value={cantidadLibros}
                onChange={(e) => setCantidadLibros(e.target.value)}
            />
            <input
                type="text"
                placeholder="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            />
            <input
                type="date"
                placeholder="Fecha de Adquisición"
                value={fechaAdquisicion}
                onChange={(e) => setFechaAdquisicion(e.target.value)}
            />
            <button type="submit">Crear Registro de Inventario</button>
        </form>
    );
};

export default CreateInventario;
