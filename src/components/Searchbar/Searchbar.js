import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import s from './Searchbar.module.css';
import SearchForm from './SearchForm';

class Searchbar extends Component {
  state = {
    imageName: '',
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  handleNameChange = e => {
    this.setState({ imageName: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { imageName } = this.state;
    const { onSubmit } = this.props;

    if (imageName.trim() === '') {
      toast.error('Please enter the name of the picture');
      return;
    }

    onSubmit(imageName);
    this.setState({ imageName: '' });
  };

  render() {
    const { imageName } = this.state;

    return (
      <header className={s.Searchbar}>
        <SearchForm
          onSubmit={this.handleSubmit}
          value={imageName}
          onChange={this.handleNameChange}
        />
      </header>
    );
  }
}

export default Searchbar;
