import errorImage from '../../images/error-image.jpg';
import s from './ImageErrorView.module.css';

interface Props {
  message: string;
};

export default function ImageErrorView({ message }: Props) {
  return (
    <div role="alert" className={s.errorImage}>
      <img src={errorImage} width="240" height="240" alt="errorImage" />
      <p>{message}</p>
    </div>
  );
}
