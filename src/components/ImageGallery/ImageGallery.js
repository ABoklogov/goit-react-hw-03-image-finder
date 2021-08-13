import s from './ImageGallery.module.css';
import ImageGalleryItem from './ImageGalleryItem';

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
