import React from 'react';

const Carousel = (props) => (
    <>
        <div id="relatedProducts" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
                <li data-target="#relatedProducts" data-slide-to="0" class="active"></li>
                <li data-target="#relatedProducts" data-slide-to="4"></li>
            </ol>
            <div class="carousel-inner carousel-current-display">
                <div class="carousel-item active" interval="0">
                    <div class="row carousel-third">
                        <div class="col">
                            <img class="d-block w-100" src="https://oyster.ignimgs.com/mediawiki/apis.ign.com/pokemon-switch/e/ea/Grookey.jpg?width=325" alt="1 slide"></img>
                        </div>
                        <div class="col">
                            <img class="d-block w-100" src="https://oyster.ignimgs.com/mediawiki/apis.ign.com/pokemon-switch/4/40/Sobble.jpg?width=1280" alt="2 slide"></img>
                        </div>
                        <div class="col">
                            <img class="d-block w-100" src="https://oyster.ignimgs.com/mediawiki/apis.ign.com/pokemon-switch/7/7c/Scorbunny.jpg?width=325" alt="3 slide"></img>
                        </div>
                        <div class="col">
                            <img class="d-block w-100" src="https://oyster.ignimgs.com/mediawiki/apis.ign.com/pokemon-switch/e/ea/Grookey.jpg?width=325" alt="4 slide"></img>
                        </div>
                        <div class="col">
                            <img class="d-block w-100" src="https://oyster.ignimgs.com/mediawiki/apis.ign.com/pokemon-switch/4/40/Sobble.jpg?width=1280" alt="5 slide"></img>
                        </div>
                    </div>
                </div>
                <div class="carousel-item" interval="0">
                    <div class="row carousel-third">
                        <div class="col">
                            <img class="d-block w-100" src="https://oyster.ignimgs.com/mediawiki/apis.ign.com/pokemon-go/1/18/6.jpg?width=325" alt="6 slide"></img>
                        </div>
                        <div class="col">
                            <img class="d-block w-100" src="https://oyster.ignimgs.com/mediawiki/apis.ign.com/pokemon-switch/e/ea/Grookey.jpg?width=325" alt="7 slide"></img>
                        </div>
                        <div class="col">
                            <img class="d-block w-100" src="https://oyster.ignimgs.com/mediawiki/apis.ign.com/pokemon-switch/4/40/Sobble.jpg?width=1280" alt="8 slide"></img>
                        </div>
                        <div class="col">
                            <img class="d-block w-100" src="https://oyster.ignimgs.com/mediawiki/apis.ign.com/pokemon-switch/7/7c/Scorbunny.jpg?width=325" alt="9 slide"></img>
                        </div>
                        <div class="col">
                            <img class="d-block w-100" src="https://i2-prod.mirror.co.uk/incoming/article8434561.ece/ALTERNATES/s615b/Pikachu.jpg" alt="10 slide"></img>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <a class="carousel-control-prev" href="#relatedProducts" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#relatedProducts" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </>
)

export default Carousel;

      
{/* <img class="d-block w-100" src="https://oyster.ignimgs.com/mediawiki/apis.ign.com/pokemon-switch/4/40/Sobble.jpg?width=1280" alt="1 slide"></img> */}