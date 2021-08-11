import { Component } from 'react';

const API_KEY = '22144472-c4d53a495baf7d3490978ff95';
const BASE_URL = 'https://pixabay.com/api/';
const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class ImageInfo extends Component {
  state = {
    images: null,
    error: null,
    status: Status.IDLE,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imageName;
    const nextName = this.props.imageName;

    if (prevName !== nextName) {
      fetch(
        `${BASE_URL}?q=${nextName}&page=${1}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
      )
        .then(response => response.json())
        .then(images => console.log(images));
    }
  }

  render() {
    return <div></div>;
  }
}

export default ImageInfo;
