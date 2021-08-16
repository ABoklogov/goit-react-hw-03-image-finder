import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({
  smallImage,
  bigImage,
  alt,
  openModal,
}) {
  const onOpenModalClick = () => {
    openModal(bigImage, alt);
  };

  return (
    <li className={s.ImageGalleryItem}>
      <img
        className={s.ImageGalleryItemImage}
        onClick={onOpenModalClick}
        src={smallImage}
        alt={alt}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  smallImage: PropTypes.string.isRequired,
  bigImage: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  openModal: PropTypes.func,
};
