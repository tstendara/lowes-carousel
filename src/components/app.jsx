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
      productId: Math.ceil(Math.random() * 100),
      productIdQuery: `?id=${this.state.productId}`
    };
  }

  componentDidMount() {
    Axios.post(`http://localhost:3000/users/`, {
      itemId: this.state.productId
    })
      .then(())
    Axios.get(`http://localhost:3000/carousels${this.state.productIdQuery}`)
      .then((carouselImages) => {
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
          name={this.state.carouselNames[0]}
          images={this.state.carousels.alsoViewed.slice(0, 15)}
        />
        <Carousel
          name={this.state.carouselNames[1]}
          images={this.state.carousels.related.slice(0, 15)}
        />
        <Carousel
          name={this.state.carouselNames[2]}
          images={this.state.carousels.prevViewed.slice(0, 30)}
        />
      </div>
    );
  }
}

export default App;
