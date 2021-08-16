import PropTypes from 'prop-types';
import s from './SearchForm.module.css';

export default function SearchForm({ onSubmit, value, onChange }) {
  return (
    <form className={s.SearchForm} onSubmit={onSubmit}>
      <button type="submit" className={s.SearchFormButton}>
        <span className={s.SearchFormButtonLabel}>Search</span>
      </button>

      <input
        className={s.SearchFormInput}
        type="text"
        autoComplete="off"
        autoFocus
        value={value}
        placeholder="Search images and photos"
        onChange={onChange}
      />
    </form>
  );
}

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
