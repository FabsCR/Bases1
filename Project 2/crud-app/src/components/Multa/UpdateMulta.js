import React, { useState } from 'react';

const UpdateMulta = () => {
    const [idMulta, setIdMulta] = useState('');
    const [monto, setMonto] = useState('');
    const [estado, setEstado] = useState('');

    const handleUpdate = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/multa/${idMulta}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ monto, estado }),
        });
        await response.json();
    };

    return (
        <form onSubmit={handleUpdate}>
            <input
                type="text"
                placeholder="ID de Multa"
                value={idMulta}
                onChange={(e) => setIdMulta(e.target.value)}
            />
            <input
                type="text"
                placeholder="Nuevo Monto"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
            />
            <input
                type="text"
                placeholder="Nuevo Estado"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
            />
            <button type="submit">Actualizar Multa</button>
        </form>
    );
};

export default UpdateMulta;