import { Component } from 'react';
import apiImages from '../../services/image-api';
import s from './ImageInfo.module.css';
import ImageErrorView from '../ImageErrorView';
import ImageGallery from '../ImageGallery';
import Button from '../Button';
// import Loader from '../Loader';
import Loader from 'react-loader-spinner';
import Modal from '../Modal';

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
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imageName;
    const nextName = this.props.imageName;

    if (prevName !== nextName) {
      this.setState({ status: Status.PENDING });

      apiImages
        .fetchImage(nextName)
        .then(comeImages => {
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

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { images, error, status, showModal } = this.state;
    // const { imageName } = this.props;

    if (status === 'idle') {
      return <div className={s.message}>please enter image title</div>;
    }

    if (status === 'pending') {
      return (
        <Loader
          className={s.Loader}
          type="ThreeDots"
          color="#00BFFF"
          height={100}
          width={100}
        />
      );
    }

    if (status === 'resolved') {
      return (
        <>
          <ImageGallery images={images} />
          <Button />
          {showModal && <Modal onClose={this.toggleModal} />}
        </>
      );
    }

    if (status === 'rejected') {
      return <ImageErrorView message={error.message} />;
    }
  }
}

export default ImageInfo;
