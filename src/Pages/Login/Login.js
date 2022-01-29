import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import NavBar from '../../Components/NavBar/NavBar.js';
import useAuth from '../../hooks/useAuth.js';

const Login = () => {

    const { singInUsingGoogle } = useAuth();
    const history = useHistory();
    const location = useLocation();
    const redirectTo = location.state?.from || "/";
    const googleLoginButton = () => {
        singInUsingGoogle()
        .then(result => {
            console.log('inside login',history, location);
            history.push(redirectTo);
        })
    }
    return (
        <div>
            <NavBar />
            <h1>Sign In</h1>
            <button onClick={googleLoginButton} className='btn btn-warning'>Google Sign In</button>
        </div>
    );
};

export default Login;