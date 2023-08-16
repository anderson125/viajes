import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Slider = ({ images }) => {
  return (
    <div className="slider-container">
      <Carousel showArrows emulateTouch showStatus={false} >
        {images.map((image, index) => (
          <div key={index} className="image-slide">
            <img src={`http://api.directorioturismo.com/api/customer/image/${image}`} alt={`Slide ${index}`} />
          </div>
        ))}
      </Carousel>
      <style jsx>{`
        .slider-container {
          max-width: 100%;
          height: 50%px;
          margin: 0 auto;
        }

        .image-slide img {
          max-width: 100%;
          height: 400px;
        }

        .thumbs-wrapper {
          display: flex;
          justify-content: center;
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          margin-bottom: 10px; /* Ajusta el margen inferior según tu preferencia */
        }
      `}</style>
    </div>
  );
};

export default Slider;