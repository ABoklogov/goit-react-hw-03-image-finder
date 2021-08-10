import React, { Component } from 'react';
import Searchbar from '../Searchbar';

class App extends Component {
  state = {
    imageName: '',
  };

  handleFormSubmit = imageName => {
    this.setState({ imageName });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
      </div>
    );
  }
}

export default App;
