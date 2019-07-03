import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return(
            <div>
                <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                        <img class="d-block w-100" src="..." alt="First slide"></img>
                        </div>
                        <div class="carousel-item">
                        <img class="d-block w-100" src="..." alt="Second slide"></img>
                        </div>
                        <div class="carousel-item">
                        <img class="d-block w-100" src="..." alt="Third slide"></img>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));