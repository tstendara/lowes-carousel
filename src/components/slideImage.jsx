import React from 'react';

const SlideImage = (props) => (
        <div class="slide-image">
            <img src={props.image} alt={`slide${props.index}`}></img>
        </div>
)

export default SlideImage;