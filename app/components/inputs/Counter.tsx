import { useState } from 'react';

interface CounterProps {
  id: string;
  name: string;
}

function Counter({ id, name }: CounterProps) {
  const [count, setCount] = useState(1);
  return (
    <div>
      <button
        type="button"
        onClick={() => setCount((prevCount) => prevCount - 1)}
        disabled={count === 1}
      >
        -1
      </button>
      <input type="number" id={id} name={name} value={count} readOnly />
      <button
        type="button"
        onClick={() => setCount((prevCount) => prevCount + 1)}
      >
        +1
      </button>
    </div>
  );
}

export default Counter;
