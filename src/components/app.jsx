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
      productId: Math.ceil(Math.random() * 100).toString()
    };
    this.handleClick = this.handleClick.bind(this);
    this.updateUserHistory = this.updateUserHistory.bind(this);
    this.getCarousels = this.getCarousels.bind(this);
    this.renderCarousels = this.renderCarousels.bind(this);
  }

  componentDidMount() {
    this.updateUserHistory(this.state.productId)
      .then(this.getCarousels)
      .then(this.renderCarousels)
      .catch(err => {console.log('react says: ', err)})
  }

  handleClick(e) {
    console.log(e.target.id);
  }

  updateUserHistory(selectedProductId) {
    return Axios.post('http://localhost:3000/users', {
      itemId: selectedProductId
    })
  }

  getCarousels() {
    return Axios.get(`http://localhost:3000/carousels?id=${this.state.productId}`)
  }

  renderCarousels(newCarousels) {
    this.setState({
      carousels: newCarousels.data
    });
  }

  render() {
    return (
      <div>
        <Carousel
          name={this.state.carouselNames[0]}
          images={this.state.carousels.alsoViewed.slice(0, 15)}
          handleClick={this.handleClick}
        />
        <Carousel
          name={this.state.carouselNames[1]}
          images={this.state.carousels.related.slice(0, 15)}
          handleClick={this.handleClick}
        />
        <Carousel
          name={this.state.carouselNames[2]}
          images={this.state.carousels.prevViewed.slice(0, 30)}
          handleClick={this.handleClick}
        />
      </div>
    );
  }
}

export default App;
