import React from 'react'
import ImageSlider, { Slide } from "react-auto-image-slider";

function Slider() {
    return (
        <div>
            <ImageSlider effectDelay={500} autoPlayDelay={2000}>
                <Slide>
                    <img alt="img2" src="https://unsplash.com/photos/JTlwuJblZdk" />
                </Slide>
                <Slide>
                    <img alt="img2" src="https://unsplash.com/photos/JTlwuJblZdk" />
                </Slide>
                <Slide>
                    <img alt="img1" src="https://unsplash.com/photos/JTlwuJblZdk" />
                </Slide>
            </ImageSlider>
        </div>
    );
}

export default Slider;