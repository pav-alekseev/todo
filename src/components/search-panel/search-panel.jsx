import React from 'react';

import './search-panel.css';

const SearchPanel = ({ onSearchChange }) => (
  <input
    className="search-panel form-control"
    type="text"
    placeholder="Search"
    onChange={e => onSearchChange(e.target.value)}
  />
);

export default SearchPanel;
