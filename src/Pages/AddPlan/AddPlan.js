import React from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import './AddPlan.css'
import NavBar from '../../Components/NavBar/NavBar';

const AddPlan = () => {
    
    const { register, handleSubmit, reset } = useForm();
    
    const onSubmit = data => {
        axios.post('https://enigmatic-escarpment-74305.herokuapp.com/plans' , data)
            .then(res => {
                if(res.data.insertedId){
                    alert('Successfully added');
                    reset();
                }
            });
    };

    return (
        <div>
            <NavBar/>
            <h1>Add Plan</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='d-flex flex-column w-25 mx-auto mt-5'>
                <input placeholder='Name' className='mb-3 reg-input' {...register("Name", { required: true })} />
                <input placeholder='Description' className='mb-3 reg-input' {...register("Description", { required: true })} />
                <input placeholder='Image URL' className='mb-3 reg-input' {...register("Image_url", { required: true })} />
                <input placeholder='Duration' className='mb-3 reg-input' type="number" {...register("Duration", { required: true })} /> 
                <input placeholder='Pre-booked Hotel ( Yes / No )' className='mb-3 reg-input' {...register("prebooked_hotel", { required: true })} />
                <input placeholder='price' className='mb-3 reg-input' type="number" {...register("price", { required: true })} />
                <input type="submit" />
            </form>
        </div>
    );
};

export default AddPlan;