import React, { useState } from 'react';

const DeleteMulta = () => {
    const [idMulta, setIdMulta] = useState('');

    const handleDelete = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/multa/${idMulta}`, {
            method: 'DELETE',
        });
        await response.json();
        // Clear input field after deleting multa
        setIdMulta('');
    };

    return (
        <form onSubmit={handleDelete}>
            <input
                type="text"
                placeholder="ID de Multa a Eliminar"
                value={idMulta}
                onChange={(e) => setIdMulta(e.target.value)}
            />
            <button type="submit">Eliminar Multa</button>
        </form>
    );
};

export default DeleteMulta;