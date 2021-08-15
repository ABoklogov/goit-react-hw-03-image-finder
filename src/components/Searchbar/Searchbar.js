import React, { Component } from 'react';
import SearchForm from './SearchForm';
import { toast } from 'react-toastify';
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

    if (this.state.imageName.trim() === '') {
      toast.error('Please enter the name of the picture');
      return;
    }

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
