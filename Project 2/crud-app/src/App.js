import React from 'react';
import { CreatePersona, DeletePersona, UpdatePersona, ReadPersona } from './components/Persona';
import { CreateEditorial, DeleteEditorial, UpdateEditorial, ReadEditorial } from './components/Editorial';
import { CreateAutor, DeleteAutor, UpdateAutor, ReadAutor } from './components/Autor';
import { CreateUsuario, DeleteUsuario, UpdateUsuario, ReadUsuario } from './components/Usuario';
import { CreateGenero, DeleteGenero, UpdateGenero, ReadGenero } from './components/Genero';
import { CreateLibro, DeleteLibro, UpdateLibro, ReadLibro } from './components/Libro';
import { CreateInventario, DeleteInventario, UpdateInventario, ReadInventario } from './components/Inventario';
import { CreatePrestamo, DeletePrestamo, UpdatePrestamo, ReadPrestamo } from './components/Prestamo';
import { CreateReserva, DeleteReserva, UpdateReserva, ReadReserva } from './components/Reserva';
import { CreateMulta, DeleteMulta, UpdateMulta, ReadMulta } from './components/Multa';

function App() {
  return (
    <div className="App">
      <h1>Gestión de Personas</h1>
      <CreatePersona />
      <DeletePersona />
      <UpdatePersona />
      <ReadPersona />
      <h1>Gestión de Editoriales</h1>
      <CreateEditorial />
      <DeleteEditorial />
      <UpdateEditorial />
      <ReadEditorial />
      <h1>Gestión de Autores</h1>
      <CreateAutor />
      <DeleteAutor />
      <UpdateAutor />
      <ReadAutor />
      <h1>Gestión de Usuarios</h1>
      <CreateUsuario />
      <DeleteUsuario />
      <UpdateUsuario />
      <ReadUsuario />
      <h1>Gestión de Géneros</h1>
      <CreateGenero />
      <DeleteGenero />
      <UpdateGenero />
      <ReadGenero />
      <h1>Gestión de Libros</h1>
      <CreateLibro />
      <DeleteLibro />
      <UpdateLibro />
      <ReadLibro />
      <h1>Gestión de Inventarios</h1>
      <CreateInventario />
      <DeleteInventario />
      <UpdateInventario />
      <ReadInventario />
      <h1>Gestión de Préstamos</h1>
      <CreatePrestamo />
      <DeletePrestamo />
      <UpdatePrestamo />
      <ReadPrestamo />
      <h1>Gestión de Reservas</h1>
      <CreateReserva />
      <DeleteReserva />
      <UpdateReserva />
      <ReadReserva />
      <h1>Gestión de Multas</h1>
      <CreateMulta />
      <DeleteMulta />
      <UpdateMulta />
      <ReadMulta />
    </div>
  );
}

export default App;
