import React from "react";
import Slide from "./slide.jsx";
import Slider from "react-slick";
import styles from "../style/main.less";
import "../style/slick.css";
import "../style/slick-theme.css";

const Carousel = props => {
  var settings = {
    dots: true,
    infinite: false,
    speed: 600,
    slidesToShow: 4.5,
    slidesToScroll: 3
  };

  return (
    <div class={styles['total-carousel-container']}>
      <h2>{props.name}</h2>
      <Slider {...settings}>
        {props.images.map((image, index) => {
          return (
            <Slide
              image={image}
              index={index}
              sale={`i'm on sale babyy`}
              handleClick={props.handleClick}
            />
          );
        })}
      </Slider>
    </div>
  );
};

export default Carousel;
