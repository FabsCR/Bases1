import React, { useState } from 'react';

const CreateMulta = () => {
    const [idPrestamo, setIdPrestamo] = useState('');
    const [monto, setMonto] = useState('');
    const [estado, setEstado] = useState('');

    const handleCreate = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/multa', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_prestamo: idPrestamo, monto, estado }),
        });
        await response.json();
    };

    return (
        <form onSubmit={handleCreate}>
            <input
                type="text"
                placeholder="ID de Prestamo"
                value={idPrestamo}
                onChange={(e) => setIdPrestamo(e.target.value)}
            />
            <input
                type="text"
                placeholder="Monto"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
            />
            <input
                type="text"
                placeholder="Estado"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
            />
            <button type="submit">Crear Multa</button>
        </form>
    );
};

export default CreateMulta;
