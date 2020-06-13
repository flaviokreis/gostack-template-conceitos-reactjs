import React, { useState, useEffect } from "react";
import api from "./services/api";

import Repository from './components/Repository';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    getRepositories();
  }, []);

  function getRepositories() {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Desafio Node.js ${Date.now()}`,
      url: "https://github.com/flaviokreis/gostack-template-conceitos-nodejs",
      techs: [
        "Node.js", "ExpressJS", "Javascript"
      ]
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    setRepositories(repositories.filter(repository => repository.id !== id));
  }  

  return (
    <div>
      <ul data-testid="repository-list">
      { repositories.map(repository => 
          <Repository 
            repository={repository}
            onDelete={(id) => handleRemoveRepository(id)} />) }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
