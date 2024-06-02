import React, { useState } from 'react';

const DeleteInventario = () => {
    const [idLibro, setIdLibro] = useState('');

    const handleDelete = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/inventario/${idLibro}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        console.log('Registro de inventario eliminado:', data);
    };

    return (
        <form onSubmit={handleDelete}>
            <input
                type="text"
                placeholder="ID del Libro"
                value={idLibro}
                onChange={(e) => setIdLibro(e.target.value)}
            />
            <button type="submit">Eliminar Registro de Inventario</button>
        </form>
    );
};

export default DeleteInventario;
