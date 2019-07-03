import React from 'react';
import Carousel from './carousel.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return(
            <div>
                <Carousel />
            </div>
        )
    }
}

export default App;