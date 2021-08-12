import React, { Component } from 'react';
import Searchbar from '../Searchbar';
import ImageInfo from '../ImageInfo';
import s from './App.module.css';

class App extends Component {
  state = {
    imageName: '',
  };

  handleFormSubmit = imageName => {
    this.setState({ imageName });
  };

  render() {
    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageInfo imageName={this.state.imageName} />
      </div>
    );
  }
}

export default App;
