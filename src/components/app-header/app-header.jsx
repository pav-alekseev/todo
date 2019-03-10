import React from 'react';

import './app-header.css';

const AppHeader = ({ todo, done }) => (
  <div className="app-header d-flex">
    <h1>Todo List</h1>
    <h2>
      {todo}
      {' '}
      more to do,
      {' '}
      {done}
      {' '}
      done
    </h2>
  </div>
);

export default AppHeader;
