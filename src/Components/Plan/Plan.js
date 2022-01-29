import React from 'react';
import { Link } from 'react-router-dom';

const Plan = (props) => {
    const { Name, Description, price, Image_url, _id, Duration, prebooked_hotel } = props.plan;

    const url = `/booking/${_id}`;
    return (
        <div className="col">
            <div className="card h-100">
                <img src={Image_url} style={{ height: '400px' }} className="card-img-top" alt="aaaa" />
                <div className="card-body">
                    <h5 className="card-title">{Name}</h5>
                    <p className="card-text">{Description}</p>
                    <h5>Duration: {Duration} days</h5>
                    <h5>Pre-booked Hotel: {prebooked_hotel}</h5>
                    <h6>$ {price}</h6>
                    <Link to={url}>
                        <button className='btn btn-primary'>Book Now</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Plan;