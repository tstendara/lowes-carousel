import React from "react";
import Carousel from "./carousel.jsx";
// import Axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // url : 'https://fec-lowes.s3.us-east-2.amazonaws.com/hammer1.jpg'
      carouselNames: [
        "Customers Also Viewed",
        "Related Items",
        "Previously Viewed"
      ]
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e, ref) {
    // console.log(e.target);
    // console.log(ref.current.id);
    // ref.current.id.carousel('pause');
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <Carousel
          handleClick={this.handleClick}
          name={this.state.carouselNames[0]}
        />
        <Carousel
          handleClick={this.handleClick}
          name={this.state.carouselNames[1]}
        />
        <Carousel
          handleClick={this.handleClick}
          name={this.state.carouselNames[2]}
        />
      </div>
    );
  }
}

export default App;
