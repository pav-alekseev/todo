import React, { Component } from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component {
  constructor() {
    super();

    this.state = {
      filterButtons: [
        { name: 'all', label: 'All' },
        { name: 'active', label: 'Active' },
        { name: 'done', label: 'Done' },
      ],
    };
  }

  render() {
    const { filter, onFilterChange } = this.props;
    const { filterButtons } = this.state;

    const buttons = filterButtons.map(({ name, label }) => {
      const isActive = name === filter;
      const classNames = ['btn'];

      if (isActive) {
        classNames.push('btn-info');
      } else {
        classNames.push('btn-outline-secondary');
      }

      return (
        <button
          key={name}
          type="button"
          onClick={() => onFilterChange(name)}
          className={classNames.join(' ')}
        >
          {label}
        </button>
      );
    });

    return (
      <div className="btn-group">
        {buttons}
      </div>
    );
  }
}
