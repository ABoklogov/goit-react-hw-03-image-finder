import { Component, Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from 'react-loader-spinner';
import s from './App.module.css';
import Searchbar from '../Searchbar';
import { fetchImage, apiOptions } from '../../services/image-api';
import ImageGallery from '../ImageGallery';
import ImageErrorView from '../ImageErrorView';
import Button from '../Button';
import Modal from '../Modal';
import Images from '../../interfaces/Images.interfece';
import comeImages from '../../interfaces/comeImages.interface';

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

interface State {
  imageName: string;
  images: Images[];
  page: number;
  error: string;
  showModal: boolean;
  status: string;
};

class App extends Component<{}, State> {
  state: State = {
    imageName: '',
    images: [],
    page: 1,
    error: '',
    showModal: false,
    status: Status.IDLE,
  };

  componentDidUpdate(prevProps: {}, prevState: State) {
    const prevName = prevState.imageName;
    const nextName = this.state.imageName;

    if (prevName !== nextName) {
      this.setState((prevState: State) => ({
        ...prevState,
        page: 1,
        images: [],
        status: Status.PENDING,
      }));

      this.loaderImages(nextName);
    }
  };

  loaderImages = (name: string, page = 1) => {
    this.setState({ status: Status.PENDING });

    fetchImage(name, page)
      .then((comeImages: comeImages) => {
        if (comeImages.total !== 0) {
          this.setState(({ images, page }: State) => ({
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
      .catch((error: string) =>
        this.setState((state: State) => ({
          ...state,
          error,
          status: Status.REJECTED,
        }))
      );
  };

  handleFormSubmit = (imageName: string) => {
    this.setState((prevState: State) => ({ ...prevState, imageName }));
  };

  toggleModal = (urlImage: string, alt: string) => {
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
            <div className={s.Loader}>
              <Loader
                type="ThreeDots"
                color="#00BFFF"
                height={100}
                width={100}
              />
            </div>
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

        {status === 'rejected' && <ImageErrorView message={error} />}

        {showModal && (
          <Modal
            bigImage={dataModal.url}
            alt={dataModal.alt}
            onClose={() => this.setState(({ showModal }) => ({ showModal: !showModal }))}
          />
        )}

        <ToastContainer />
      </div>
    );
  }
}

export default App;
