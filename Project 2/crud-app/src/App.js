import React from 'react';
import { CreatePersona, DeletePersona, UpdatePersona, ReadPersona } from './components/Persona';

function App() {
  return (
    <div className="App">
      <h1>Gestión de Personas</h1>
      <CreatePersona />
      <DeletePersona />
      <UpdatePersona />
      <ReadPersona />
    </div>
  );
}

export default App;
