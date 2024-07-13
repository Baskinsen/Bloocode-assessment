import { useState } from "react";

interface Images {
  images: string[];

}

const Carousel = ({ images }: Images) => {
  const [currentIndex, setCurrentIndex] = useState(0);

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
      <div
        className="carousel-inner"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images?.map((image, index) => (
          <div className="carousel-item" key={index}>
            <img
              src={image}
              alt={`Image ${index}`}
              className="carousel-image"
            />
          </div>
        ))}
      </div>
      
        <button
          onClick={goToPrevious}
          className="carousel-button"
          disabled={currentIndex === 0}
        >
          &#10094;
        </button>
        <button
          onClick={goToNext}
          className="carousel-button"
          disabled={currentIndex === images.length - 1}
        >
          &#10095;
        </button>
      
    </div>
  );
};

export default Carousel;
