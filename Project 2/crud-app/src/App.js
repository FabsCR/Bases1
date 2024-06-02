import React from 'react';
import CreatePersona from './components/Persona/CreatePersona';
import DeletePersona from './components/Persona/DeletePersona';
import UpdatePersona from './components/Persona/UpdatePersona';
import ReadPersona from './components/Persona/ReadPersona';

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
