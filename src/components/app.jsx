import React from "react";
import Carousel from "./carousel.jsx";
import Axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: "",
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
      reviews: {
        alsoViewed: [],
        related: [],
        prevViewed: [],
        favoritesCarousel: []
      },
      prices: {
        alsoViewed: [],
        related: [],
        prevViewed: [],
        favoritesCarousel: []
      },
      loggedIn: false,
      username: "",
      favoritesCarousel: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.scrollToTop = this.scrollToTop.bind(this);
    this.emitProductId = this.emitProductId.bind(this);
    this.updateUserHistory = this.updateUserHistory.bind(this);
    this.getFaveArray = this.getFaveArray.bind(this);
    this.getCarousels = this.getCarousels.bind(this);
    this.getPrices = this.getPrices.bind(this);
    this.getReviews = this.getReviews.bind(this);
    this.renderCarousels = this.renderCarousels.bind(this);
    this.updateProductView = this.updateProductView.bind(this);
  }

  componentDidMount() {
    window.addEventListener("product", e => {
      const clickedId = e.detail.product_id.toString();
      this.updateProductView(clickedId);
    });
    window.addEventListener("stars", e => {
      this.updateProductView(this.state.productId);
    });
    // window.addEventListener("favorite", e => {
    //   const favedId = e.detail.product_id.toString();
    //   this.state.loggedIn
    //     ? this.updateUserFavorites(this.state.username, favedId)
    //     : null;
    // });
    window.addEventListener("loggedIn", e => {
      if (e.detail.username) {
        this.getFaveArray(e.detail.favoriteList)
          .then((faveCarousel) => {
            this.setState({
              loggedIn: e.detail.loggedIn,
              username: e.detail.username,
              favoritesCarousel: faveCarousel
            });
          })
      }
    });
    window.addEventListener("loggedOut", e => {
      this.setState({
        loggedIn: e.detail.loggedIn,
        username: "",
        favoritesCarousel: []
      });
    });
    // this.updateUserHistory(this.state.productId)
    //   .then(this.getCarousels)
    //   .then(this.renderCarousels)
    //   .then(this.getPrices)
    //   .then(this.getReviews)
    //   .then(this.getUserFavorites)
    //   .then(this.renderFaveCarousel)
    //   .catch(err => {
    //     console.log(err);
    //   });
  }
  

  handleClick(e) {
    const clickedId = Number(
      e.target.id.slice(e.target.id.length - 3)
    ).toString();
    this.emitProductId(clickedId);
    this.scrollToTop();
  }

  scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "auto"
    });
  }

  emitProductId(productId) {
    let product = new CustomEvent("product", {
      detail: { product_id: productId }
    });
    window.dispatchEvent(product);
  }

  updateUserHistory(selectedProductId) {
    return Axios.post(
      "http://fec-lowes-carousel.us-east-2.elasticbeanstalk.com/users",
      {
        itemId: selectedProductId
      },
      { withCredentials: true }
    );
  }

  getCarousels() {
    return Axios.get(
      `http://fec-lowes-carousel.us-east-2.elasticbeanstalk.com/carousels?id=${
        this.state.productId
      }`,
      { withCredentials: true }
    );
  }

  getFaveArray(itemIdArray) {
    const idArr = itemIdArray.join('+');
    return Axios.get(
      `http://fec-lowes-carousel.us-east-2.elasticbeanstalk.com/faves?id=${
        idArr
      }`,
      { withCredentials: true }
    );
  }

  getPrices() {
    Axios.get(
      `http://ec2-18-188-213-241.us-east-2.compute.amazonaws.com/prices/all`,
      { withCredentials: true }
    )
      .then(allPrices => {
        const prices = {};
        for (let carousel in this.state.carousels) {
          const arr = [];
          this.state.carousels[carousel].forEach(item => {
            const allPriceData = allPrices.data;
            for (let i = 0; i < allPriceData.length; i++) {
              let checkItem = allPriceData[i];
              if (checkItem.SS === Number(item.id)) {
                arr.push(checkItem.price);
                if (arr.length === carousel.length) {
                  break;
                }
              }
            }
          });
          prices[carousel] = arr;
        }
        if (this.state.loggedIn && this.state.favoritesCarousel.length > 0) {
          const arr = [];
          this.state.favoritesCarousel.forEach(item => {
            const allPriceData = allPrices.data;
            for (let i = 0; i < allPriceData.length; i++) {
              let checkItem = allPriceData[i];
              if (checkItem.SS === Number(item.id)) {
                arr.push(checkItem.price);
                if (arr.length === carousel.length) {
                  break;
                }
              }
            }
          });
          prices.favoritesCarousel = arr;
        }
        return prices;
      })
      .then(applicablePrices => {
        this.setState({
          prices: applicablePrices
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getReviews() {
    Axios.get(
      `http://ec2-18-225-6-113.us-east-2.compute.amazonaws.com/api/stats/all`,
      { withCredentials: true }
    )
      .then(allReviews => {
        const reviews = {};
        for (let carousel in this.state.carousels) {
          const arr = [];
          this.state.carousels[carousel].forEach(item => {
            const reviewData = allReviews.data[item.id - 1].reviewStats;
            arr.push([reviewData.reviewCount, reviewData.averageStars]);
          });
          reviews[carousel] = arr;
        }
        if (this.state.loggedIn && this.state.favoritesCarousel.length > 0) {
          const arr = [];
          this.state.favoritesCarousel.forEach(item => {
            const reviewData = allReviews.data[item.id - 1].reviewStats;
            arr.push([reviewData.reviewCount, reviewData.averageStars]);
          });
          reviews.favoritesCarousel = arr;
        }
        return reviews;
      })
      .then(applicableReviews => {
        this.setState({
          reviews: applicableReviews
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  renderCarousels(newCarousels) {
    this.setState({
      carousels: newCarousels.data
    });
  }

  updateProductView(newProductId) {
    this.setState({ productId: newProductId });
    this.updateUserHistory(newProductId)
      .then(this.getCarousels)
      .then(this.renderCarousels)
      .then(this.getFavorites)
      .then(this.renderFaveCarousel)
      .then(this.getPrices)
      .then(this.getReviews)
      .catch(err => {
        console.log("event listener says: ", err);
      });
  }

  render() {
    return (
      <div>
        {this.state.loggedIn && this.state.favoritesCarousel.length > 0 ? (
          <Carousel
            name={`${this.state.username}\'s Saved & Faved`}
            images={this.state.favoritesCarousel.slice(0, 15)}
            prices={this.state.price.favoritesCarousel}
            reviews={this.state.price.favoritesCarousel}
            handleClick={this.handleClick}
          />
        ) : null}
        {this.state.carousels.alsoViewed.length > 0 ? (
          <Carousel
            name={this.state.carouselNames[0]}
            images={this.state.carousels.alsoViewed.slice(0, 15)}
            prices={this.state.prices.alsoViewed}
            reviews={this.state.reviews.alsoViewed}
            handleClick={this.handleClick}
          />
        ) : null}
        {this.state.carousels.related.length > 0 ? (
          <Carousel
            name={this.state.carouselNames[1]}
            images={this.state.carousels.related.slice(0, 15)}
            prices={this.state.prices.related}
            reviews={this.state.reviews.related}
            handleClick={this.handleClick}
          />
        ) : null}
        {this.state.carousels.prevViewed.length > 0 ? (
          <Carousel
            name={this.state.carouselNames[2]}
            images={this.state.carousels.prevViewed.slice(0, 15)}
            prices={this.state.prices.prevViewed}
            reviews={this.state.reviews.prevViewed}
            handleClick={this.handleClick}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
