export default function ImageGalleryItem({ smallImage, alt }) {
  return <img src={smallImage} alt={alt} className="ImageGalleryItem-image" />;
}
