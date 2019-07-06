import React from 'react';
import Slide from './slide.jsx';

import Slider from "react-slick";


function Carousel(props) { 

    
    return (
        <>
            <div id="relatedProducts" class="carousel slide carousel-slide" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#relatedProducts" data-slide-to="0" class="active"></li>
                    <li data-target="#relatedProducts" data-slide-to="4"></li>
                </ol>
                <div class="carousel-inner carousel-current-display">
                    <div class="carousel-item active" interval="0">
                        <Slide images={props.images}/>
                    </div>
                    <div class="carousel-item" interval="0">
                        <Slide images={props.images}/>
                    </div>
                </div>
            </div>
            <a class="carousel-control-prev" href="#relatedProducts" role="button" data-slide="prev" 
            onClick={(e)=>{props.handleClick(e}}}>
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#relatedProducts" role="button" data-slide="next"
            onClick={(e)=>{props.handleClick(e)}}>
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </>
    )
}



export default Carousel;

      
{/* <img class="d-block w-100" src="https://oyster.ignimgs.com/mediawiki/apis.ign.com/pokemon-switch/4/40/Sobble.jpg?width=1280" alt="1 slide"></img> */}