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
      productId: "1"
    };
    this.handleClick = this.handleClick.bind(this);
    this.emitProductId = this.emitProductId.bind(this);
    this.updateUserHistory = this.updateUserHistory.bind(this);
    this.getCarousels = this.getCarousels.bind(this);
    this.renderCarousels = this.renderCarousels.bind(this);
    this.updateProductView = this.updateProductView.bind(this);
  }

  componentDidMount() {
    window.addEventListener('product', (e) => {
      const clickedId = e.detail.product_id.toString();
      this.updateProductView(clickedId);   
    });
    this.updateUserHistory(this.state.productId)
      .then(this.getCarousels)
      .then(this.renderCarousels)
      .catch(err => {console.log('component during mount says: ', err)})
  }

  handleClick(e) {
    const clickedId = Number(e.target.id.slice(e.target.id.length - 3)).toString();
    console.log('gonna emit: ', clickedId);
    this.emitProductId(clickedId);
  }

  
  emitProductId(productId) {
    let product = new CustomEvent('product', {detail: {product_id: productId}})
    window.dispatchEvent(product)
  }
  
  updateUserHistory(selectedProductId) {
    return Axios.post('http://fec-lowes-carousel.us-east-2.elasticbeanstalk.com/users', {
      itemId: selectedProductId
    })
  }
  
  getCarousels() {
    return Axios.get(`http://fec-lowes-carousel.us-east-2.elasticbeanstalk.com/carousels?id=${this.state.productId}`)
  }

  // getPrices() {
  //   return Axios.get(`http://ec2-18-188-213-241.us-east-2.compute.amazonaws.com/prices/${this.state.productId}`)
  // }

  // getReviews() {
  //   return Axios.get(`http://ec2-18-225-6-113.us-east-2.compute.amazonaws.com/api/product/`)
  // }
  
  renderCarousels(newCarousels) {
    this.setState({
      carousels: newCarousels.data
    });
  }

  updateProductView(newProductId) {
    this.setState({productId: newProductId})
    this.updateUserHistory(newProductId)
      .then(this.getCarousels)
      .then(this.renderCarousels)
      .catch(err => {console.log('event listener says: ', err)})
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
