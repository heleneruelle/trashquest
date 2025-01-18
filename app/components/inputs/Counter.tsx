import { useState } from 'react';
import PlusIcon from '../icons/PlusIcon';
import MinusIcon from '../icons/MinusIcon';

interface CounterProps {
  id: string;
  name: string;
  label: string;
}

function Counter({ id, name, label }: CounterProps) {
  const [count, setCount] = useState(1);
  return (
    <div className="counter-container">
      <label htmlFor={id}>{label}</label>
      <div className="counter">
        <button
          type="button"
          className="counter-button"
          onClick={() => setCount((prevCount) => prevCount - 1)}
          disabled={count === 1}
        >
          <MinusIcon />
        </button>
        <input type="number" id={id} name={name} value={count} readOnly />
        <button
          type="button"
          className="counter-button"
          onClick={() => setCount((prevCount) => prevCount + 1)}
        >
          <PlusIcon />
        </button>
      </div>
    </div>
  );
}

export default Counter;
