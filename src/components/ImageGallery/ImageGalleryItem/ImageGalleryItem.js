import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
import Modal from '../../Modal';
import { Component } from 'react';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  static propTypes = {
    smallImage: PropTypes.string,
    bigImage: PropTypes.string,
    alt: PropTypes.string,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { smallImage, alt, bigImage } = this.props;
    const { showModal } = this.state;

    return (
      <li className={s.ImageGalleryItem}>
        <img
          onClick={this.toggleModal}
          src={smallImage}
          alt={alt}
          className={s.ImageGalleryItemImage}
        />

        {showModal && (
          <Modal bigImage={bigImage} alt={alt} onClose={this.toggleModal} />
        )}
      </li>
    );
  }
}

export default ImageGalleryItem;
