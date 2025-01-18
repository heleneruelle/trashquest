import React from 'react';

function TwoColumnsLayout({
  children,
  leftColumnWidth,
}: {
  children: React.ReactNode;
  leftColumnWidth?: string;
}) {
  const [leftChild, rightChild] = React.Children.map(
    children,
    (child) => child
  );

  return (
    <div className="two-columns-layout--wrapper">
      <div
        className="column-layout__left"
        style={{
          minWidth: leftColumnWidth,
          maxWidth: leftColumnWidth,
        }}
      >
        {leftChild}
      </div>
      <div className="column-layout__right">{rightChild}</div>
    </div>
  );
}

export default TwoColumnsLayout;
