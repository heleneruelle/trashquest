interface FieldWithChildProps {
  fieldName: string;
  children: React.ReactNode;
  id: string;
}

function FieldWithChild({ id, fieldName, children }: FieldWithChildProps) {
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
      {children}
    </div>
  );
}

export default FieldWithChild;
