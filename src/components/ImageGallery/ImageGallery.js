import s from './ImageGallery.module.css';
import ImageGalleryItem from './ImageGalleryItem';

export default function ImageGallery({ images }) {
  return (
    <ul className={s.ImageGallery}>
      {images.map(el => (
        <ImageGalleryItem
          key={el.id}
          smallImage={el.webformatURL}
          alt={el.tags}
        />
      ))}
    </ul>
  );
}
