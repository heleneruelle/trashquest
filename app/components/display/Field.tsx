interface DisplayFieldProps {
  fieldName: string;
  fieldValue: string;
  id: string;
}

function Field({ id, fieldName, fieldValue }: DisplayFieldProps) {
  return (
    <div
      role="region"
      aria-labelledby={`display-field-${id}`}
      id={id}
      className="display-field"
    >
      <p>
        <strong>{fieldName}</strong>
      </p>
      <p>{fieldValue}</p>
    </div>
  );
}

export default Field;
