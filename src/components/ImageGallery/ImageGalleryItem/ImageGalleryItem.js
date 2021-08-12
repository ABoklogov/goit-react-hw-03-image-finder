import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ smallImage, alt }) {
  return (
    <li className={s.ImageGalleryItem}>
      <img src={smallImage} alt={alt} className={s.ImageGalleryItemImage} />
    </li>
  );
}
