import errorImage from '../../images/error-image.jpg';
import s from './ImageErrorView.module.css';
import PropTypes from 'prop-types';

export default function ImageErrorView({ message }) {
  return (
    <div role="alert" className={s.errorImage}>
      <img src={errorImage} width="240" height="240" alt="errorImage" />
      <p>{message}</p>
    </div>
  );
}

ImageErrorView.propTypes = {
  message: PropTypes.string,
};
