import React, { useState } from 'react';

const DeletePrestamo = () => {
    const [idPrestamo, setIdPrestamo] = useState('');

    const handleDelete = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/prestamo/${idPrestamo}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        console.log('Préstamo eliminado:', data);
    };

    return (
        <form onSubmit={handleDelete}>
            <input
                type="text"
                placeholder="ID del Préstamo"
                value={idPrestamo}
                onChange={(e) => setIdPrestamo(e.target.value)}
            />
            <button type="submit">Eliminar Préstamo</button>
        </form>
    );
};

export default DeletePrestamo;
