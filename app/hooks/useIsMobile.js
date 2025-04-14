import { useState, useEffect } from 'react';

const useIsMobile = (breakpoint = 800) => {
  const [isMobile, setIsMobile] = useState(null); // Initialisation à null pour indiquer qu'on attend le côté client

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    checkMobile();

    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [breakpoint]);

  return isMobile;
};

export default useIsMobile;
