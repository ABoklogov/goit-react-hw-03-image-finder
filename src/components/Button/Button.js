import s from './Button.module.css';

export default function Button({ loadMoreImages }) {
  return (
    <button className={s.Button} type="button" onClick={loadMoreImages}>
      Load more
    </button>
  );
}
