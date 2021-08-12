import { Component } from 'react';
import apiImages from '../../services/image-api';
import ImageErrorView from '../ImageErrorView';

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
      apiImages
        .fetchImage(nextName)
        .then(comeImages => {
          // console.log(comeImages);
          if (comeImages.total !== 0) {
            this.setState({
              images: comeImages.hits,
              status: Status.RESOLVED,
            });
            return;
          }

          return Promise.reject(
            new Error(`Нет такого изображения: ${nextName}`),
          );
        })
        .catch(error =>
          this.setState({
            error,
            status: Status.REJECTED,
          }),
        );
    }
  }

  render() {
    const { images, error, status } = this.state;
    const { imageName } = this.props;

    if (status === 'rejected') {
      return <ImageErrorView message={error.message} />;
    }
    return <div></div>;
  }
}

export default ImageInfo;
