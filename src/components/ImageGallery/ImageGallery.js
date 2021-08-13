import s from './ImageGallery.module.css';
import ImageGalleryItem from './ImageGalleryItem';

export default function ImageGallery({ images }) {
  const onOpenModalClick = bigImage => {
    console.log(bigImage);
  };

  return (
    <ul className={s.ImageGallery}>
      {images.map(el => (
        <ImageGalleryItem
          onClick={onOpenModalClick(el.largeImageURL)}
          key={el.id}
          smallImage={el.webformatURL}
          alt={el.tags}
        />
      ))}
    </ul>
  );
}
