import React from 'react';
import useIsMobile from '~/hooks/useIsMobile';

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

  const isMobile = useIsMobile();

  console.log('useIsMobile', isMobile, leftColumnWidth);

  return (
    <div className="two-columns-layout--wrapper">
      <div
        className="column-layout__left"
        style={{
          minWidth: isMobile ? '100%' : leftColumnWidth,
          maxWidth: isMobile ? '100%' : leftColumnWidth,
        }}
      >
        {leftChild}
      </div>
      <div className="column-layout__right">{rightChild}</div>
    </div>
  );
}

export default TwoColumnsLayout;
