import React, { useState, useEffect } from 'react';

const ReadReporteUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const fetchUsuarios = async () => {
            const response = await fetch('http://localhost:5000/reporte_usuarios');
            const data = await response.json();
            setUsuarios(data);
        };
        fetchUsuarios();
    }, []);

    return (
        <div>
            <h2>Reporte de Usuarios</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID Usuario</th>
                        <th>Usuario</th>
                        <th>ID Reserva</th>
                        <th>Fecha Reserva</th>
                        <th>Título Libro</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map(usuario => (
                        <tr key={usuario.IDUsuario}>
                            <td>{usuario.IDUsuario}</td>
                            <td>{usuario.Usuario}</td>
                            <td>{usuario.IDReserva}</td>
                            <td>{usuario.ReservacionFecha}</td>
                            <td>{usuario.TituloLibro}</td>
                            <td>{usuario.Status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReadReporteUsuarios;
