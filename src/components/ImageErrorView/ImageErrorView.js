import errorImage from '../../images/error-image.jpg';

export default function ImageErrorView({ message }) {
  return (
    <div role="alert">
      <img src={errorImage} width="240" alt="errorImage" />
      <p>{message}</p>
    </div>
  );
}
