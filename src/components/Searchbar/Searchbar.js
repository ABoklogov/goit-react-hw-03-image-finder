import React, { Component } from 'react';
import SearchForm from './SearchForm';
import s from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    imageName: '',
  };

  handleNameChange = e => {
    this.setState({ imageName: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state.imageName);
    this.setState({ imageName: '' });
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <SearchForm
          onSubmit={this.handleSubmit}
          value={this.state.imageName}
          onChange={this.handleNameChange}
        />
      </header>
    );
  }
}

export default Searchbar;
