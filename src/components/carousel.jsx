import React from 'react';

const Carousel = (props) => (
    <>
        <div id="relatedProducts" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
                <li data-target="#relatedProducts" data-slide-to="0" class="active"></li>
                <li data-target="#relatedProducts" data-slide-to="4"></li>
            </ol>
            <div class="carousel-inner carousel-current-display">
                <div class="carousel-item active">
                    <div class="row carousel-third">
                        <div class="col">
                            <img class="d-block w-100" src={props.imageUrl} alt="1 slide"></img>
                        </div>
                        <div class="col">
                            <img class="d-block w-100" src={props.imageUrl} alt="2 slide"></img>
                        </div>
                        <div class="col">
                            <img class="d-block w-100" src={props.imageUrl} alt="3 slide"></img>
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                    <div class="row carousel-third">
                        <div class="col">
                            <img class="d-block w-100" src={props.imageUrl} alt="4 slide"></img>
                        </div>
                        <div class="col">
                            <img class="d-block w-100" src={props.imageUrl} alt="5 slide"></img>
                        </div>
                        <div class="col">
                            <img class="d-block w-100" src={props.imageUrl} alt="6 slide"></img>
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                    <div class="row carousel-third">
                        <div class="col">
                            <img class="d-block w-100" src={props.imageUrl} alt="7 slide"></img>
                        </div>
                        <div class="col">
                            <img class="d-block w-100" src={props.imageUrl} alt="8 slide"></img>
                        </div>
                        <div class="col">
                            <img class="d-block w-100" src={props.imageUrl} alt="9 slide"></img>
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

      