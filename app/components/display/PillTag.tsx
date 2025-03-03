import React from 'react';

interface PillTagProps {
  label: string;
  icon: React.ReactNode;
  style?: string;
}

const PillTag: React.FC<PillTagProps> = ({ label, icon, style }) => {
  return (
    <div className={`pill-tag pill-tag__${style}`}>
      {icon}
      <span className="pill-label">{label}</span>
    </div>
  );
};

export default PillTag;
