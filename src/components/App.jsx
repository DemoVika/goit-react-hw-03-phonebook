import React, { Component } from 'react';
import css from './app.module.css';
import { ContactForm } from './сontactForm/ContactForm';
import { ContactList } from './contactList/ContactList';
import { Filter } from './filter/Filter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    try {
      const storageContacts = JSON.parse(localStorage.getItem('contacts'));
      if (storageContacts) {
        this.setState({ contacts: storageContacts });
      }
    } catch (error) {
      console.log(error);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

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
  getVisibleContacts = () => {
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
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
          visibleContacts={this.getVisibleContacts()}
          handleDeleteItems={this.handleDeleteItems}
        />
      </div>
    );
  }
}
