import CrossIcon from '~/components/icons/CrossIcon';

interface ToastProps {
  message: string;
  type: 'error';
  callback: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function Toast({ message, type, callback }: ToastProps) {
  return (
    <div className={`toast ${type}`}>
      <button onClick={callback}>
        <CrossIcon />
      </button>
      <span>{message}</span>
    </div>
  );
}

export default Toast;
