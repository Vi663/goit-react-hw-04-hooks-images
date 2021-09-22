import React, { Component } from 'react';
import s from './Searchbar.module.css';
import { toast } from 'react-toastify';


export class Searchbar extends Component {

  state = {
    input: '',
  }

  clearInput = () => {
    this.setState({input: ""})
  }

  handleInputChange = (e) => {
    this.setState({ input: e.currentTarget.value.toLowerCase() });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.input);
    if (this.state.input.trim() === "") {
      toast.error("Please, fulfill the search form");
    }
    this.clearInput();
  }

  render() {
    return (
    <header className={s.Searchbar}>
      <form onSubmit={this.handleSubmit} className={s.SearchForm}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={s.SearchFormInput}
          type="text"
          value={this.state.input}
          // autocomplete="off"
          // autofocus
          placeholder="Search images and photos"
          onChange={this.handleInputChange}
        />
      </form>
    </header>
  )
  }
}