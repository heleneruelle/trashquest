import { IoStar } from 'react-icons/io5';

function TagTitle({ title, isBest }: { title: string; isBest?: boolean }) {
  return (
    <h5 className={`tag-title ${isBest && 'tag-title__best'} pill-tag`}>
      {isBest ? <IoStar /> : null}
      {title}
    </h5>
  );
}

export default TagTitle;
