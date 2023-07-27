import React, { Component } from 'react';
import css from './app.module.css';
import { ContactForm } from './сontactForm/ContactForm';
import { ContactList } from './contactList/ContactList';
import { Filter } from './filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleSubmit = contact => {
    if (this.state.contacts.find(item => item.name === contact.name)) {
      alert(`${contact.name} is already in contacts`);
      return;
    }

    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, contact],
      };
    });
  };

  updateFilter = filter => {
    this.setState({ filter }); //filter:filter
  };

  handleDeleteItems = id => {
    this.setState(prevState => {
      const updateItems = prevState.contacts.filter(
        element => element.id !== id
      );
      return {
        contacts: [...updateItems],
      };
    });
  };

  render() {
    return (
      <div className={css.div}>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm
          handleSubmit={this.handleSubmit}
          contacts={this.state.contacts}
        />
        <h2 className={css.title}>Contacts</h2>
        <Filter updateFilter={this.updateFilter} />
        <ContactList
          contacts={this.state.contacts.filter(contact =>
            contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
          )}
          handleDeleteItems={this.handleDeleteItems}
        />
      </div>
    );
  }
}
