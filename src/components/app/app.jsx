import React, { Component } from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import ItemStatusFilter from '../item-status-filter';
import TodoList from '../todo-list';
import AppItemForm from '../add-item-form';

import './app.css';

export default class App extends Component {
  constructor() {
    super();

    this.createTodoItem = label => ({
      label,
      important: false,
      done: false,
      id: Math.floor(Math.random() * 1000),
    });

    this.searchChange = search => this.setState({ search });

    this.searchItems = (items, search) => {
      if (search.length === 0) {
        return items;
      }

      return items.filter(item => item.label.toLowerCase().indexOf(search.toLowerCase()) > -1);
    };

    this.filterChange = filter => this.setState({ filter });

    this.filterItems = (items, filter) => {
      switch (filter) {
        case 'active':
          return items.filter(elem => !elem.done);
        case 'done':
          return items.filter(elem => elem.done);
        default:
          return items;
      }
    };

    this.toggleProperty = (arr, id, propName) => arr
      .map(elem => (elem.id === id ? { ...elem, [propName]: !elem.propName } : elem));

    this.toggleDone = (id) => {
      this.setState(({ todoData }) => ({
        todoData: this.toggleProperty(todoData, id, 'done'),
      }));
    };

    this.deleteItem = id => this
      .setState(({ todoData }) => ({
        todoData: todoData.filter(elem => elem.id !== id),
      }));

    this.toggleImportant = (id) => {
      this.setState(({ todoData }) => ({
        todoData: this.toggleProperty(todoData, id, 'important'),
      }));
    };

    this.addTodoItem = (text) => {
      this.setState(({ todoData }) => {
        const updatedTodoData = [
          ...todoData,
          this.createTodoItem(text),
        ];

        return {
          todoData: updatedTodoData,
        };
      });
    };

    this.state = {
      todoData: [
        this.createTodoItem('Drink Coffee'),
        this.createTodoItem('Make Awesome App'),
        this.createTodoItem('Have a Lunch'),
      ],
      filter: 'all',
      search: '',
    };
  }

  render() {
    const { todoData, filter, search } = this.state;
    const visibleTodoData = this.searchItems(this.filterItems(todoData, filter), search);

    const doneCount = todoData.filter(elem => elem.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader todo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel
            onSearchChange={this.searchChange}
          />
          <ItemStatusFilter
            filter={filter}
            onFilterChange={this.filterChange}
          />
        </div>
        <TodoList
          todos={visibleTodoData}
          onDeleted={this.deleteItem}
          onToggleImportant={this.toggleImportant}
          onToggleDone={this.toggleDone}
        />
        <AppItemForm
          onItemAdded={this.addTodoItem}
        />
      </div>
    );
  }
}
