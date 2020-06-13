import React from 'react';

import "../styles.css";

export default function Repository({ repository, onDelete }) {
  return (
    <>
      <li key={repository.id}>
        {repository.title}

        <button onClick={() => onDelete(repository.id)}>
          Remover
        </button>
      </li>
    </>
  );
}
