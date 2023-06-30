import s from './ImageGalleryItem.module.css';

interface Props {
  smallImage: string;
  bigImage: string;
  alt: string;
  openModal: (urlImage: string, alt: string) => void;
};

export default function ImageGalleryItem({
  smallImage,
  bigImage,
  alt,
  openModal,
}: Props) {
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