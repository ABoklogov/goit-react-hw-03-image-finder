import errorImage from '../../images/error-image.jpg';
import s from './ImageErrorView.module.css';

export default function ImageErrorView({ message }) {
  return (
    <div role="alert" className={s.errorImage}>
      <img src={errorImage} width="240" alt="errorImage" />
      <p>{message}</p>
    </div>
  );
}
