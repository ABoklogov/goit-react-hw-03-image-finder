import s from './SearchForm.module.css';

interface Props {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function SearchForm({ onSubmit, value, onChange }: Props) {
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