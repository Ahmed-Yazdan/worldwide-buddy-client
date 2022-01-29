import React, { useEffect, useState } from 'react';
import NavBar from '../../Components/NavBar/NavBar';

const ManagePlans = () => {

    const [plans, setPlans] = useState([]);

    useEffect(() => {
        fetch("https://enigmatic-escarpment-74305.herokuapp.com/plans")
            .then(res => res.json())
            .then(data => setPlans(data))
    }, [])

    const handleDeleteButton = (id) => {
        if (window.confirm('Are you sure you want to delete ?')) {
            const url = `https://enigmatic-escarpment-74305.herokuapp.com/plans/${id}`;
            fetch(url, { method: 'DELETE' })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('Deleted Successfully');
                        const remaningPLans = plans.filter(service => service._id !== id);
                        setPlans(remaningPLans);
                    }
                })
        }
    }
    return (
        <div>
            <NavBar />
            <div>
                {
                    plans.map(plan =>
                        <div className='m-3 bg-primary w-50 mx-auto p-5'>
                            <h3>Name: {plan.Name}</h3>
                            <h3>Plan ID: {plan._id}</h3>
                            <button onClick={() => handleDeleteButton(plan._id)} className='btn btn-danger'>Delete</button>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default ManagePlans;