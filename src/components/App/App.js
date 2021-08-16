import React, { Component, Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import Loader from 'react-loader-spinner';
import s from './App.module.css';
import Searchbar from '../Searchbar';
import { fetchImage, apiOptions } from '../../services/image-api';
import ImageGallery from '../ImageGallery';
import ImageErrorView from '../ImageErrorView';
import Button from '../Button';
import Modal from '../Modal';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const dataModal = {
  url: '',
  alt: '',
};

class App extends Component {
  state = {
    imageName: '',
    images: [],
    page: 1,
    error: null,
    showModal: false,
    status: Status.IDLE,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.imageName;
    const nextName = this.state.imageName;

    if (prevName !== nextName) {
      this.setState({
        page: 1,
        images: [],
        status: Status.PENDING,
      });

      this.loaderImages(nextName);
    }
  }

  loaderImages = (name, page = 1) => {
    this.setState({ status: Status.PENDING });

    fetchImage(name, page)
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

  handleFormSubmit = imageName => {
    this.setState({ imageName });
  };

  toggleModal = (urlImage, alt) => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
    dataModal.url = urlImage;
    dataModal.alt = alt;
  };

  render() {
    const { images, error, status, page, imageName, showModal } = this.state;

    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />

        {status === 'pending' && (
          <Fragment>
            {images && (
              <ImageGallery images={images} openModal={this.toggleModal} />
            )}
            <Loader
              className={s.Loader}
              type="ThreeDots"
              color="#00BFFF"
              height={100}
              width={100}
            />
          </Fragment>
        )}

        {status === 'resolved' && (
          <Fragment>
            <ImageGallery images={images} openModal={this.toggleModal} />
            {images.length >= apiOptions.PER_PAGE && (
              <Button
                loadMoreImages={() => this.loaderImages(imageName, page)}
              />
            )}
          </Fragment>
        )}

        {status === 'rejected' && <ImageErrorView message={error.message} />}

        {showModal && (
          <Modal
            bigImage={dataModal.url}
            alt={dataModal.alt}
            onClose={this.toggleModal}
          />
        )}

        <ToastContainer />
      </div>
    );
  }
}

export default App;
