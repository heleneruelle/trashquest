interface DisplayFieldProps {
  fieldName: string;
  fieldValue: string;
}

function Field({ fieldName, fieldValue }: DisplayFieldProps) {
  return (
    <div
      role="region"
      aria-labelledby="display-field"
      style={{ marginBottom: '10px' }}
    >
      <div id="display-field">
        <p>
          <strong>{fieldName}</strong>
        </p>
        <p>{fieldValue}</p>
      </div>
    </div>
  );
}

export default Field;
