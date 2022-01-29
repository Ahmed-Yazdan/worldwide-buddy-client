import React, { useEffect, useState } from 'react';
import NavBar from '../../Components/NavBar/NavBar';

const AllOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch('https://enigmatic-escarpment-74305.herokuapp.com/orders')
            .then(res => res.json())
            .then(data => {
                setOrders(data)
            })
    }, []);

    const handleDeleteButton = (id) => {
        if (window.confirm('Are you sure you want to cancel ?')) {
            const url = `https://enigmatic-escarpment-74305.herokuapp.com/orders/${id}`;
            fetch(url, { method: 'DELETE' })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('Deleted Successfully');
                        const remainingOrders = orders.filter(plan => plan._id !== id);
                        setOrders(remainingOrders);
                    }
                })
        }
    }

    return (
        <div>
            <NavBar />
            <div className='mt-5'>
                {
                    orders.map(order => 
                    <div className='my-5 bg-primary container p-5'>
                        <h1>Plan: {order.Plan}</h1>
                        <h1>Ordered by: {order.Name}</h1>
                        <h2>Email: {order.Email}</h2>
                        <h5>Address: {order.Address}</h5>
                        <h5>Status: {order.status}</h5>
                        <h5>Phone Number: {order.phoneNumber}</h5>
                        <button className='btn btn-danger' onClick={() => handleDeleteButton(order._id)}>Delete</button>
                    </div>)
                }
            </div>
        </div>
    );
};

export default AllOrders;