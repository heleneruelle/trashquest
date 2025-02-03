import StaticTag from './StaticTag';

interface DisplayFieldProps {
  fieldName: string;
  fieldValues: Array<string>;
}

function FieldWithTag({ fieldName, fieldValues }: DisplayFieldProps) {
  return (
    <div
      role="region"
      aria-labelledby="display-FieldWithTag"
      style={{ marginBottom: '10px' }}
    >
      <div id="display-field">
        <p>
          <strong>{fieldName}</strong>
        </p>
        <ul>
          {fieldValues.map((val) => (
            <li key={val}>
              <StaticTag label={val} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FieldWithTag;
