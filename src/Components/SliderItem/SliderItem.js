import React from 'react';
import { Carousel } from 'react-bootstrap';
import { SwiperSlide } from 'swiper/react';
// import { Link } from 'react-router-dom';

const SliderItem = (props) => {
    const { Image_url, Name, Description } = props.item;
    return (
        <SwiperSlide>
            <img src={Image_url} alt="a" />
            <h1>{Name}</h1>
        </SwiperSlide>
            
    );
};

export default SliderItem;