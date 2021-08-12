import ImageGalleryItem from './ImageGalleryItem';

export default function ImageGallery({ images }) {
  console.log(images);
  return (
    <ul className="ImageGallery">
      {images.map(el => (
        <li key={el.id} className="ImageGalleryItem">
          <ImageGalleryItem smallImage={el.webformatURL} alt={el.tags} />
        </li>
      ))}
    </ul>
  );
}
