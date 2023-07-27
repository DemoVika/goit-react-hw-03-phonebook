import PropTypes from 'prop-types';
import css from './filter.module.css';

export const Filter = ({ updateFilter }) => (
  <label className={css.filter}>
    Find contacts by name <br />
    <input
      className={css.input}
      type="text"
      pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
      title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
      required
      onChange={event => {
        updateFilter(event.currentTarget.value);
      }}
    />
  </label>
);

Filter.protoTypes = {
  updateFilter: PropTypes.func.isRequired,
};
