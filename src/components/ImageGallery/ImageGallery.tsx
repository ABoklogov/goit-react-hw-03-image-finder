import s from './ImageGallery.module.css';
import ImageGalleryItem from './ImageGalleryItem';
import Images from '../../interfaces/Images.interfece';

interface Props {
  images: Images[];
  openModal: (urlImage: string, alt: string) => void;
};

export default function ImageGallery({ images, openModal }: Props) {
  return (
    <ul className={s.ImageGallery}>
      {images.map(el => (
        <ImageGalleryItem
          key={el.id}
          smallImage={el.webformatURL}
          openModal={openModal}
          bigImage={el.largeImageURL}
          alt={el.tags}
        />
      ))}
    </ul>
  );
}