import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Carousel = ({ elements }: { elements: React.ReactNode[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % elements.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + elements.length) % elements.length
    );
  };

  return (
    <div className="carousel-container">
      <div
        className="carousel-slide"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {elements.map((el, index) => (
          <div key={index} className="carousel-img">
            {el}
          </div>
        ))}
      </div>
      <button className="carousel-button left" onClick={prevSlide}>
        <FaChevronLeft size={17} />
      </button>
      <button className="carousel-button right" onClick={nextSlide}>
        <FaChevronRight size={17} />
      </button>
    </div>
  );
};

export default Carousel;
