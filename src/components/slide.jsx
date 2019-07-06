import React from 'react';
import SlideImage from './slideImage.jsx';

const Slide = (props) => (
    <div class="slide">
       <SlideImage image={props.image} index={props.index} />
       <h5>this is an item and it is really cool of course</h5>
       <h6>STARS from REVIEWS</h6>
       <h6>$$$$</h6>
       <p>green text</p>
    </div>
)

export default Slide;