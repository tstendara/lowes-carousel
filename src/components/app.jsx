import React from 'react';
import Carousel from './carousel.jsx';
import Axios from 'axios';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // url : 'https://fec-lowes.s3.us-east-2.amazonaws.com/hammer1.jpg'
        }
    }

    // componentDidMount() {
    //     Axios.get('s3://fec-lowes/')
    //     .then((images) => {
    //         console.log(images);
    //     })
    // }

    render() {
        return(
            <div>
                <Carousel imageUrl={this.state.url}/>
            </div>
        )
    }
}

export default App;