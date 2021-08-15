import { Component } from 'react';
import apiImages from '../../services/image-api';
import s from './ImageInfo.module.css';
import PropTypes from 'prop-types';
import ImageErrorView from '../ImageErrorView';
import ImageGallery from '../ImageGallery';
import Button from '../Button';
import Loader from 'react-loader-spinner';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class ImageInfo extends Component {
  state = {
    images: [],
    page: 1,
    error: null,
    status: Status.IDLE,
  };

  static propTypes = {
    imageName: PropTypes.string.isRequired,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imageName;
    const nextName = this.props.imageName;

    if (prevName !== nextName) {
      this.setState({
        page: 1,
        images: [],
        status: Status.PENDING,
      });

      const defaultPage = 1;

      this.loaderImages(nextName, defaultPage);
    }
  }

  loaderImages = (name, page) => {
    apiImages
      .fetchImage(name, page)
      .then(comeImages => {
        if (comeImages.total !== 0) {
          this.setState(({ images, page }) => ({
            images: [...images, ...comeImages.hits],
            page: page + 1,
            status: Status.RESOLVED,
          }));

          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
          return;
        }

        return Promise.reject(new Error(`Нет такого изображения: ${name}`));
      })
      .catch(error =>
        this.setState({
          error,
          status: Status.REJECTED,
        }),
      );
  };

  render() {
    const { images, error, status, page } = this.state;
    const { imageName } = this.props;

    if (status === 'idle') {
      return <div className={s.message}>please enter image title</div>;
    }

    if (status === 'pending') {
      return (
        <>
          {images && <ImageGallery images={images} />}
          <Loader
            className={s.Loader}
            type="ThreeDots"
            color="#00BFFF"
            height={100}
            width={100}
          />
        </>
      );
    }

    if (status === 'resolved') {
      return (
        <>
          <ImageGallery images={images} />
          {images.length >= 12 && (
            <Button loadMoreImages={() => this.loaderImages(imageName, page)} />
          )}
        </>
      );
    }

    if (status === 'rejected') {
      return <ImageErrorView message={error.message} />;
    }
  }
}

export default ImageInfo;
