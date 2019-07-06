import React from 'react';
import Carousel from './carousel.jsx';
import Axios from 'axios';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // url : 'https://fec-lowes.s3.us-east-2.amazonaws.com/hammer1.jpg'
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e, ref) {

        // console.log(e.target);
        // console.log(ref.current.id);
        // ref.current.id.carousel('pause');
    }

    componentDidMount() {
    }

    render() {
        return(
            <div>
                <Carousel handleClick={this.handleClick}/>
                <Carousel handleClick={this.handleClick}/>
                <Carousel handleClick={this.handleClick}/>
            </div>
        )
    }
}

export default App;