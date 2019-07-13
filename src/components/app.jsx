import React from "react";
import Carousel from "./carousel.jsx";
import Axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carouselNames: [
        "Customers Also Viewed",
        "Related Items",
        "Previously Viewed"
      ],
      carousels: {
        alsoViewed: [],
        related: [],
        prevViewed: []
      },
      productIdQuery: '?id=2'
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e, ref) {
    // console.log(e.target);
    // console.log(ref.current.id);
    // ref.current.id.carousel('pause');
  }

  componentDidMount() {
    Axios.get(`http://localhost:3000/carousels${this.state.productIdQuery}`)
      .then((carouselImages) => {
        console.log(carouselImages.data);
        this.setState({
          carousels: carouselImages.data
        });
      })
      .catch(err => {console.log('react says: ', err)})
  }

  render() {
    return (
      <div>
        <Carousel
          handleClick={this.handleClick}
          name={this.state.carouselNames[0]}
          images={this.state.carousels.alsoViewed}
        />
        <Carousel
          handleClick={this.handleClick}
          name={this.state.carouselNames[1]}
          images={this.state.carousels.related}
        />
        <Carousel
          handleClick={this.handleClick}
          name={this.state.carouselNames[2]}
          images={this.state.carousels.prevViewed}
        />
      </div>
    );
  }
}

export default App;
