import React from 'react';

const Carousel = (props) => (
    <>
        <div id="relatedProducts" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
                <li data-target="#relatedProducts" data-slide-to="0" class="active"></li>
                <li data-target="#relatedProducts" data-slide-to="1"></li>
                <li data-target="#relatedProducts" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
                <div class="carousel-item active">
                <img class="d-block w-100" src="../example_data/images/hammer1.jpg" alt="First slide"></img>
                </div>
                <div class="carousel-item">
                <img class="d-block w-100" src="../example_data/images/hammer2.jpg" alt="Second slide"></img>
                </div>
                <div class="carousel-item">
                <img class="d-block w-100" src="../example_data/images/hammer3.jpg" alt="Third slide"></img>
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

      