import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../../Components/NavBar/NavBar';

const MyPlans = () => {
    const params = useParams();
    const userEmail = params.email;

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch(`https://enigmatic-escarpment-74305.herokuapp.com/orders/${userEmail}`)
            .then(res => res.json())
            .then(data => {
                setOrders(data);
            })
    }, []);

    const handleCancelButton = (id) => {
        if (window.confirm('Are you sure you want to cancel ?')) {
        const url = `https://enigmatic-escarpment-74305.herokuapp.com/orders/${id}`;
        fetch(url, { method: 'DELETE' })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    alert('Cancelled Successfully');
                    const remainingOrders = orders.filter(plan => plan._id !== id);
                    setOrders(remainingOrders);
                }
            })
        }
    }
    const handleApproveButton = (id) => {
        const url = `https://enigmatic-escarpment-74305.herokuapp.com/orders/${id}`;
        fetch(url, { method: 'PUT' })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged === true) {
                    alert('Approved successfully');
                    window.location.reload();
                    // const newOrders = orders;
                    // setOrders(newOrders);
                }
            })
    }
    return (
        <div>
            <NavBar />
            <div className='mt-5'>
                {
                    orders.map(plan => <div className='bg-info my-5 p-5 w-50 mx-auto'>
                        <h1>{plan.Plan}</h1>
                        <h2>Status: {plan.status}</h2>
                        <button onClick={() => handleApproveButton(plan._id)} className='btn btn-primary m-2'>Approve</button>
                        <button onClick={() => handleCancelButton(plan._id)} className='btn btn-primary m-2'>Cancel Order</button>
                    </div>)
                }
            </div>
        </div>
    );
};

export default MyPlans;