import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import useAuth from '../../hooks/useAuth';
import { useForm } from "react-hook-form";
import NavBar from '../../Components/NavBar/NavBar';
import axios from 'axios';

const Booking = () => {
    const planId = useParams();
    const id = planId.id;
    const { user } = useAuth();

    const [booking, setBooking] = useState({});
    useEffect(() => {
        fetch(`https://enigmatic-escarpment-74305.herokuapp.com/booking/${id}`)
            .then(res => res.json())
            .then(data => {
                setBooking(data)
            })
    }, []);
    const { Name, Description, price, Image_url, Duration, prebooked_hotel } = booking;

    const preloadedValues = {
        Name: `${user.displayName}`,
        Email: `${user.email}`
    };

    const { register: register2, reset, handleSubmit: handleSubmit2, } = useForm({
        defaultValues: preloadedValues
    });

    const newDate = new Date();
    const date = newDate.getDate();
    const month = newDate.getUTCMonth() + 1;
    const year = newDate.getFullYear();
    const orderDate = {
        date: date,
        month: month,
        year: year
    };

    const onSubmit = data => {
        const orderData = { ...data, Plan: `${Name}`, status: 'Pending', orderDate }
        axios.post("https://enigmatic-escarpment-74305.herokuapp.com/orders", orderData)
            .then(res => {
                if (res.data.insertedId) {
                    alert('Place order successful');
                    reset();
                }
            });
    };

    return (
        <div>
            <NavBar />
            <div className="card mb-3 mx-auto w-50 mt-3">
                <img src={Image_url} style={{ height: '400px' }} className="card-img-top w-100" alt="aaaaa" />
                <div className="card-body">
                    <h1 className="card-title text-bold">{Name}</h1>
                    <p className="card-text">{Description}</p>
                    <h2 className="card-text"><span className="text-primary">Price</span>: ${price}</h2>
                    <h2 className="card-text"><span className="text-primary">Duration</span>: {Duration}</h2>
                    <h2 className="card-text"><span className="text-primary">Pre-booked Hotel</span>: {prebooked_hotel}</h2>
                    <div>
                        <h3 className='mt-5'>Fill out this form and click the <span className='text-primary'>place order</span> button to purchase</h3>
                        <form onSubmit={handleSubmit2(onSubmit)} className='d-flex flex-column w-50 mx-auto mt-5'>
                            <input name="Name" ref={register2} placeholder='Name' type="text" className='mb-3 reg-input' {...register2("Name", { required: true })} />
                            <input name="Email" ref={register2} placeholder='Email' type="text" className='mb-3 reg-input' {...register2("Email", { required: true })} />
                            <input placeholder='Address' className='mb-3 reg-input' {...register2("Address", { required: true })} />
                            <input placeholder='Phone number' className='mb-3 reg-input' type="number" {...register2("phoneNumber", { required: true })} />
                            <input className='btn btn-primary' type="submit" value="Place Order" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Booking;