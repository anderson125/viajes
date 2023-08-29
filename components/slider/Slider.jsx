import { Carousel } from 'react-responsive-carousel';
import styles from './slider.module.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Slider = ({ images }) => {
  return (
    <div className={styles["slider-container"]}>
      <Carousel showArrows emulateTouch showStatus={false} >
        {images.map((image, index) => (
          <div key={index} className={styles["image-slide"]}>
            {image ? (
              <img src={`https://api.directorioturismo.com/api/customer/image/${image}`} alt={`Slide ${index}`} />
            ) : (
              <img src="/default.jpg" alt={`Slide ${index}`} />
            )}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;