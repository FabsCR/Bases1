import React from 'react';
import CreatePersona from './components/CreatePersona';
import DeletePersona from './components/DeletePersona';
import UpdatePersona from './components/UpdatePersona';
import ReadPersona from './components/ReadPersona';

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
