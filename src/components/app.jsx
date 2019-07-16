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
    this.emitProductId = this.emitProductId.bind(this);
    this.updateUserHistory = this.updateUserHistory.bind(this);
    this.getCarousels = this.getCarousels.bind(this);
    this.renderCarousels = this.renderCarousels.bind(this);
  }

  componentDidMount() {
    this.updateUserHistory(this.state.productId)
      .then(this.getCarousels)
      .then(this.renderCarousels)
      .catch(err => {console.log('component during mount says: ', err)})
  }

  handleClick(e) {
    const clickedId = e.target.id.slice(e.target.id.length - 3);
    console.log('gonna emit: ', clickedId);
    this.emitProductId(clickedId);
    this.setState({productId: clickedId})
    this.updateUserHistory(clickedId)
      .then(this.getCarousels)
      .then(this.renderCarousels)
      .catch(err => {console.log('click handler says: ', err)})
  }

  emitProductId(productId) {
    let product = new CustomEvent('product', {detail: {product_id: productId}})
    window.addEventListener('product', (e) => console.log(e.detail.product_id));
    window.dispatchEvent(product)
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
