import React from 'react';

interface StaticTagProps {
  label: string;
}

function StaticTag({ label }: StaticTagProps) {
  return (
    <span role="tag" className="tag" aria-label={`Tag: ${label}`}>
      {label}
    </span>
  );
}

export default StaticTag;
