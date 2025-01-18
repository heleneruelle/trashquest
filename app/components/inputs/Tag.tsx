import { ChangeEventHandler, MouseEventHandler } from 'react';

interface TagProps {
  id: string;
  name: string;
  callback?:
    | ChangeEventHandler<HTMLSelectElement>
    | MouseEventHandler<HTMLButtonElement>
    | undefined;
  selected?: boolean;
}

function Tag({ id, name, callback, selected = false }: TagProps) {
  return (
    <button
      type="button"
      id={id}
      name={name}
      value={id}
      onClick={callback}
      onKeyDown={(e) => e.key === 'Enter' && callback && callback(e)}
      className={`tag ${selected && 'tag__selected'}`}
    >
      {name}
    </button>
  );
}

export default Tag;
