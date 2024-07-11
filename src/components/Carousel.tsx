import  { useState } from "react";
const Carousel = ({ images}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="carousel">
      <img
        src={images[currentIndex]}
        alt={`Image ${currentIndex}`}
        className="carousel-image"
      />
      <button onClick={goToPrevious} className="carousel-button">
        Previous
      </button>
      <button onClick={goToNext} className="carousel-button">
        Next
      </button>
    </div>
  );
};

export default Carousel
