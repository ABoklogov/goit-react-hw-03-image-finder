import s from './Button.module.css';
import PropTypes from 'prop-types';

export default function Button({ loadMoreImages }) {
  return (
    <button className={s.Button} type="button" onClick={loadMoreImages}>
      Load more
    </button>
  );
}

Button.propTypes = {
  loadMoreImages: PropTypes.func,
};
