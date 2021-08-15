import s from './ImageGallery.module.css';
import ImageGalleryItem from './ImageGalleryItem';
import PropTypes from 'prop-types';

export default function ImageGallery({ images }) {
  return (
    <ul className={s.ImageGallery}>
      {images.map(el => (
        <ImageGalleryItem
          key={el.id}
          smallImage={el.webformatURL}
          bigImage={el.largeImageURL}
          alt={el.tags}
        />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape),
};
