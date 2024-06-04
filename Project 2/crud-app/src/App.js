import React, { useState } from 'react';
import './App.css'; 
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
import ReadReporteLibros from './components/Vistas/ReporteLibros';
import ReadReporteInventario from './components/Vistas/ReporteInventario';
import ReadReportePrestamos from './components/Vistas/ReportePrestamos';
import ReadReporteUsuarios from './components/Vistas/ReporteUsuarios';
import ReadReporteMultas from './components/Vistas/ReporteMultas';

function App() {
  const [showLibros, setShowLibros] = useState(false);
  const [showInventario, setShowInventario] = useState(false);
  const [showPrestamos, setShowPrestamos] = useState(false);
  const [showUsuarios, setShowUsuarios] = useState(false);
  const [showMultas, setShowMultas] = useState(false);

  return (
    <div className="App">
      <h1>CRUD APP - Biblioteca San Charlie</h1>
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

      <h1>Reportes</h1>
      <button onClick={() => setShowLibros(!showLibros)}>Mostrar Reporte Libros</button>
      {showLibros && <ReadReporteLibros />}
      
      <button onClick={() => setShowPrestamos(!showPrestamos)}>Mostrar Reporte Préstamos</button>
      {showPrestamos && <ReadReportePrestamos />}

      <button onClick={() => setShowInventario(!showInventario)}>Mostrar Reporte Inventario</button>
      {showInventario && <ReadReporteInventario />}

      <button onClick={() => setShowUsuarios(!showUsuarios)}>Mostrar Reporte Usuarios</button>
      {showUsuarios && <ReadReporteUsuarios />}

      <button onClick={() => setShowMultas(!showMultas)}>Mostrar Reporte Multas</button>
      {showMultas && <ReadReporteMultas />}

      <div className="link-container">
      <a href="https://github.com/FabsCR/Bases1" target="_blank" rel="noreferrer">Github Repo</a>
      </div>
    
    </div>
  );
}

export default App;
