import React from 'react';
import SlideImage from './slideImage.jsx';

const Slide = (props) => (
    <div class="row carousel-third">
        {props.images.map((image, index) => {
            return <SlideImage image={image} index={index} />
        })}
    </div>
)

export default Slide;