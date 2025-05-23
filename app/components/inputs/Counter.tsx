import { useState } from 'react';
import PlusIcon from '../icons/PlusIcon';
import MinusIcon from '../icons/MinusIcon';

interface CounterProps {
  id: string;
  name: string;
  label: string;
  defaultCount?: number;
}

function Counter({ id, name, label, defaultCount = 1 }: CounterProps) {
  const [count, setCount] = useState(defaultCount);
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
        <input
          type="number"
          id={id}
          name={name}
          value={count}
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            if (!isNaN(value) && value >= 1) {
              setCount(value);
            } else if (e.target.value === '') {
              setCount(NaN);
            }
          }}
          onBlur={() => {
            if (isNaN(count)) {
              setCount(1);
            }
          }}
        />
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
