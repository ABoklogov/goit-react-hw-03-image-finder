import { Component } from 'react';
import apiImages from '../../services/image-api';
import s from './ImageInfo.module.css';
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

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imageName;
    const nextName = this.props.imageName;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevName !== nextName || prevPage !== nextPage) {
      this.setState({ status: Status.PENDING });

      if (prevName !== nextName) {
        this.setState({ images: [], page: 1 });
      }

      apiImages
        .fetchImage(nextName, this.state.page)
        .then(comeImages => {
          if (comeImages.total !== 0) {
            this.setState(({ images }) => ({
              images: [...images, ...comeImages.hits],
              status: Status.RESOLVED,
            }));

            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: 'smooth',
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

  loadMoreImages = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  render() {
    const { images, error, status } = this.state;

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
          <Button loadMoreImages={this.loadMoreImages} />
        </>
      );
    }

    if (status === 'rejected') {
      return <ImageErrorView message={error.message} />;
    }
  }
}

export default ImageInfo;
