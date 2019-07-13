import React from "react";
import Slide from "./slide.jsx";
import Slider from "react-slick";

const Carousel = props => {
    
  var settings = {
      dots: true,
      infinite: false,
      speed: 600,
      slidesToShow: 4.5,
      slidesToScroll: 3
    };

    return (
      <div class="total-carousel-container">
        <h2>{props.name}</h2>
        <Slider {...settings}>
          {props.images.map((image, index) => {
            return (
              <Slide image={image} index={index} sale={`i'm on sale baby`} />
            );
          })}
        </Slider>
      </div>
    );
  }

export default Carousel;
