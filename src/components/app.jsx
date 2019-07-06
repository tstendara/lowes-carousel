import React from 'react';
import Carousel from './carousel.jsx';
import Axios from 'axios';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // url : 'https://fec-lowes.s3.us-east-2.amazonaws.com/hammer1.jpg'
            dummyImages : [
                "https://oyster.ignimgs.com/mediawiki/apis.ign.com/pokemon-switch/7/7c/Scorbunny.jpg?width=325",
                "https://oyster.ignimgs.com/mediawiki/apis.ign.com/pokemon-switch/4/40/Sobble.jpg?width=1280",
                "https://oyster.ignimgs.com/mediawiki/apis.ign.com/pokemon-switch/e/ea/Grookey.jpg?width=325",
                "https://d2skuhm0vrry40.cloudfront.net/2018/articles/2018-03-28-11-57/mew.jpg/EG11/resize/300x-1/quality/75/format/jpg",
                "https://i.pinimg.com/236x/27/9c/90/279c90b543aa11ff4733a37a9c994896--mega-pokemon-pokemon-funny.jpg"
            ]
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
                <Carousel images={this.state.dummyImages}/>
            </div>
        )
    }
}

export default App;