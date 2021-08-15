import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './App.module.css';
import Searchbar from '../Searchbar';
import ImageInfo from '../ImageInfo';

class App extends Component {
  state = {
    imageName: '',
  };

  handleFormSubmit = imageName => {
    this.setState({ imageName });
  };

  render() {
    const { imageName } = this.state;

    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageInfo imageName={imageName} />
        <ToastContainer />
      </div>
    );
  }
}

export default App;
