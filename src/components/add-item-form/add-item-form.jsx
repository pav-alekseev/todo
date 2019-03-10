import React, { Component } from 'react';

import './add-item-form.css';

export default class AddItemForm extends Component {
  constructor() {
    super();

    this.state = {
      label: '',
    };

    this.onLabelChange = (e) => {
      this.setState({
        label: e.target.value,
      });
    };

    this.onSubmit = (e) => {
      const { onItemAdded } = this.props;
      const { label } = this.state;

      e.preventDefault();
      onItemAdded(label);
      this.setState({
        label: '',
      });
    };
  }

  render() {
    const { label } = this.state;

    return (
      <form
        className="item-add-form d-flex"
        onSubmit={this.onSubmit}
      >
        <input
          className="form-control"
          type="text"
          onChange={this.onLabelChange}
          value={label}
          placeholder="What needs to be done"
        />
        <button
          className="btn btn-outline-secondary"
          type="submit"
        >
          Add
        </button>
      </form>
    );
  }
}
