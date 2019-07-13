import React from "react";
import Slide from "./slide.jsx";
import Slider from "react-slick";

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: this.props.images
    };
  }

  // componentDidMount() {
  //   this.setState({
  //     images: this.props.images
  //   });
  // }

  render() {
    var settings = {
      dots: true,
      infinite: false,
      speed: 600,
      slidesToShow: 4.5,
      slidesToScroll: 3
    };
    console.log(this.state.images);
    return (
      <div class="total-carousel-container">
        <h2>{this.props.name}</h2>
        <Slider {...settings}>
          {this.state.images.map((image, index) => {
            return (
              <Slide image={image} index={index} sale={`i'm on sale baby`} />
            );
          })}
        </Slider>
      </div>
    );
  }
}

export default Carousel;
