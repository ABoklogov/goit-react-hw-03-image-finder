import s from './Button.module.css';

interface Props {
  loadMoreImages: () => void
};

export default function Button({ loadMoreImages }: Props) {
  return (
    <button className={s.Button} type="button" onClick={loadMoreImages}>
      Load more
    </button>
  );
}