import React, { useState, useEffect } from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import Plan from '../../Components/Plan/Plan';

const Plans = (props) => {

    let { sliceCount, showNavbar } = props;

    // console.log(sliceCount);
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        fetch('https://enigmatic-escarpment-74305.herokuapp.com/plans')
            .then(res => res.json())
            .then(data => {
                setPlans(data)
            })
    }, []);

    if (sliceCount === 'all') {
        sliceCount = plans.length;
    }

    return (
        <div>
            {showNavbar === true && <NavBar />}
            <div className='container mt-5'>
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {
                        plans.slice(0, sliceCount).map(data => <Plan plan={data} key={data._id} />)
                    }
                </div>
            </div>
        </div>
    );
};

export default Plans;