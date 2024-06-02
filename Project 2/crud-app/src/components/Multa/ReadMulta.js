import React, { useState, useEffect } from 'react';

const ReadMulta = () => {
    const [multas, setMultas] = useState([]);

    useEffect(() => {
        const fetchMultas = async () => {
            const response = await fetch('http://localhost:5000/multa');
            const data = await response.json();
            setMultas(data);
        };
        fetchMultas();
    }, []);

    return (
        <div>
            <h2>Lista de Multas</h2>
            <ul>
                {multas.map((multa) => (
                    <li key={multa.IDMulta}>
                        ID Multa: {multa.IDMulta} - ID Prestamo: {multa.IDPrestamo} - Monto: {multa.Monto} - Estado: {multa.Estado}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReadMulta;