import React from 'react';
import { CreatePersona, DeletePersona, UpdatePersona, ReadPersona } from './components/Persona';
import { CreateEditorial, DeleteEditorial, UpdateEditorial, ReadEditorial } from './components/Editorial';
import { CreateAutor, DeleteAutor, UpdateAutor, ReadAutor } from './components/Autor';


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
    </div>
  );
}

export default App;
