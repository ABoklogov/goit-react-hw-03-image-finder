import s from './ImageGalleryItem.module.css';
import Modal from '../../Modal';
import { Component } from 'react';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
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
