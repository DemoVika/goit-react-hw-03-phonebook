import PropTypes from 'prop-types';
import React, { Component } from 'react';
import css from './contactForm.module.css';
import shortid from 'shortid';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleInput = event => {
    const { name, value } = event.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  nameId = event => {
    event.preventDefault();
    const contact = {
      name: this.state.name,
      id: shortid.generate(),
      number: this.state.number,
    };
    this.props.handleSubmit(contact);
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    return (
      <form className={css.container} onSubmit={this.nameId}>
        <label>
          Name
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={this.state.name}
            onChange={this.handleInput}
          />
        </label>{' '}
        <label>
          Number
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={this.state.number}
            onChange={this.handleInput}
          />
        </label>
        <button className={css.button} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

ContactForm.protoTypes = {
  handleSubmit: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }),
};
