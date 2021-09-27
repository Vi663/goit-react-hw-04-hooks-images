import { useState } from 'react';
import s from './Searchbar.module.css';
import { toast } from 'react-toastify';

const initialState = '';
export function Searchbar({onSubmit}) {

  const [input, setInput] = useState(initialState);

  const clearInput = () => {
    setInput(initialState)
  }

  const handleInputChange = (e) => {
    setInput(e.currentTarget.value.toLowerCase())
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") {
      toast.error("Please, fulfill the search form");
    } else {
      onSubmit(input);
      clearInput();
    }
  }
  return (
    <header className={s.Searchbar}>
      <form onSubmit={handleSubmit} className={s.SearchForm}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={s.SearchFormInput}
          type="text"
          value={input}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleInputChange}
        />
      </form>
    </header>
  )
}