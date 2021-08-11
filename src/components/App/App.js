import React, { Component } from 'react';
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
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageInfo imageName={this.state.imageName} />
      </div>
    );
  }
}

export default App;
