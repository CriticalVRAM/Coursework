import React, { Component } from 'react';
import classes from './App.css';

import Cockpit from '../components/Cockpit/Cockpit'
import Persons from '../components/Persons/Persons';

class App extends Component {
  state = {
    persons: [
      {id: '001', name: 'Max', age: 28},
      {id: '002', name: 'Manu', age: 29},
      {id: '003', name: 'Stephanie', age: 26}
    ],
    showPersons: false
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(cur => {
      return cur.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value

    const persons = [...this.state.persons]
    persons[personIndex] = person

    this.setState({persons: persons});
  };

  deletePersonHandler = (index) => {
    const personsChange = [...this.state.persons]
    personsChange.splice(index, 1);
    this.setState({persons: personsChange});
  };

  togglePersonsHandler = () => {
    this.setState({showPersons: !this.state.showPersons});
  };


  render() {
    let persons = null;

    if (this.state.showPersons) {
      persons = <Persons
        persons={this.state.persons}
        clicked={this.deletePersonHandler}
        changed={this.nameChangedHandler}
      />
    }

    return (
      <div className={classes.App}>
        <Cockpit
        showPersons = {this.state.showPersons}
        persons = {this.state.persons}
        clicked={this.togglePersonsHandler}
        />
        {persons}
      </div>
    );
  }
}

export default App;