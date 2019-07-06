import React from 'react';
import Slide from './slide.jsx';
import Slider from "react-slick";
import SlideImage from './slideImage.jsx';


class Carousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dummyImages : [
                "https://oyster.ignimgs.com/mediawiki/apis.ign.com/pokemon-switch/7/7c/Scorbunny.jpg?width=325",
                "https://oyster.ignimgs.com/mediawiki/apis.ign.com/pokemon-switch/4/40/Sobble.jpg?width=1280",
                "https://oyster.ignimgs.com/mediawiki/apis.ign.com/pokemon-switch/e/ea/Grookey.jpg?width=325",
                "https://d2skuhm0vrry40.cloudfront.net/2018/articles/2018-03-28-11-57/mew.jpg/EG11/resize/300x-1/quality/75/format/jpg",
                "https://i.pinimg.com/236x/27/9c/90/279c90b543aa11ff4733a37a9c994896--mega-pokemon-pokemon-funny.jpg",
                "https://oyster.ignimgs.com/mediawiki/apis.ign.com/pokemon-switch/7/7c/Scorbunny.jpg?width=325",
                "https://oyster.ignimgs.com/mediawiki/apis.ign.com/pokemon-switch/4/40/Sobble.jpg?width=1280",
                "https://oyster.ignimgs.com/mediawiki/apis.ign.com/pokemon-switch/e/ea/Grookey.jpg?width=325",
                "https://d2skuhm0vrry40.cloudfront.net/2018/articles/2018-03-28-11-57/mew.jpg/EG11/resize/300x-1/quality/75/format/jpg",
                "https://i.pinimg.com/236x/27/9c/90/279c90b543aa11ff4733a37a9c994896--mega-pokemon-pokemon-funny.jpg"
            ]
        }
    }

    render() {
      var settings = {
        dots: true,
        infinite: false,
        speed: 600,
        slidesToShow: 4.5,
        slidesToScroll: 3
      };
      return (
        <div class="total-carousel-container">
        <h2>{this.props.name}</h2>
        <Slider {...settings}>
            {this.state.dummyImages.map((image, index) => {
                return <Slide image={image} index={index} />
            })}
        </Slider>
        </div>
      );
    }
  }

export default Carousel;


