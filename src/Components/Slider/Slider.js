import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import SliderItem from '../SliderItem/SliderItem';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination"
import SwiperCore, { Pagination } from 'swiper';

const Slider = () => {
    const [items, setItems] = useState([]);
    useEffect(() => {
        fetch('https://enigmatic-escarpment-74305.herokuapp.com/plans')
            .then(res => res.json())
            .then(data => setItems(data))
    }, []);

    const pagination = {
        "clickable": true,
        "renderBullet": function (index, className) {
            return '<span class=\"' + className + '\">' + (index + 1) + '</span>';
        }
    }

    return (
        <div>
            <Swiper pagination={pagination} navigation={true} className="mySwiper w-100" loop={true}>
                {
                    items.map(item => <SliderItem item={item} key={item._id} />)
                }
            </Swiper>
        </div>
    );
};

export default Slider;