import React from 'react';

const SlideImage = (props) => (
        <div class="col">
            <img class="d-block w-100" src={props.image} alt={`slide${props.index}`}></img>
        </div>
)

export default SlideImage;