import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import NavBar from '../../Components/NavBar/NavBar';
import Slider from '../../Components/Slider/Slider';
import useAuth from '../../hooks/useAuth';
import Plans from '../Plans/Plans';
import "./Home.css";

const Home = () => {
    // const imageLinks = [
    //     "https://upload.wikimedia.org/wikipedia/commons/9/91/Mount_Kilimanjaro.jpg",
    //     "https://i.ibb.co/2ZbBP40/photo-1520520731457-9283dd14aa66.jpg",
    //     "https://i.ibb.co/xDtKR9f/photo-1590603740183-980e7f6920eb.jpg",
    // ]
    // let i = 1;
    // const bgChanger = () => {
    //     i += 1;
    //     if (i === imageLinks.length) {
    //         i = 0;
    //     }

    //     const homeId = document.getElementById('home');
    //     const image_url = imageLinks[i];
    //     homeId.style.backgroundImage = `url(${image_url})`;
    // };


    // setInterval(bgChanger, 4000);
    
    const { user } = useAuth();

    const url = `/orders/${user.email}`;

    return (
        <div className='mb-5'>
            <div style={{ backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/9/91/Mount_Kilimanjaro.jpg)` }} className='mb-5' id='home'>
                <NavBar page='home' />
                <h1 className='mt-5 text-center tour-buddy-text'>The best tour buddy <br />who will always be with you</h1>
                <div className='disabled test d-flex justify-content-evenly align-items-center'>
                    <Link to={!user.email ? '/login' : '/addplan'}>
                        <button className='bottom-buttons'>Add a plan</button>
                    </Link>
                    <Link to={!user.email ? '/login' : '/manageplans'}>
                        <button className='bottom-buttons'>Manage Plans</button>
                    </Link>
                    <Link to={!user.email ? '/login' : `${url}`}>
                        <button className='bottom-buttons'>My Plans</button>
                    </Link>
                    <Link to={!user.email ? '/login' : '/allorders'}>
                        <button className='bottom-buttons'>All Orders</button>
                    </Link>
                </div>
            </div>
            {/* <Slider/> */}
            <h1 className='my-5'>YES! <br />you can Visit the whole world too!</h1>
            <Plans sliceCount={3} showNavbar={false} />
            <Link to='/plans'>
                <button className='btn btn-primary mt-5'>View All Plans</button>
            </Link>
        </div>
    );
};

export default Home;