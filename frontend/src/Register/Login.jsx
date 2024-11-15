import React, {  useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import './Login.css'
import { loginUser } from '../Component/Redux/actions';
import { Link } from 'react-router-dom';
import axiosInstance from '../config/axiosConfig';


const Login = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setemail] = useState(''); // a state variable to store the email and set the email to the input value using useState
    const [pass, setpass] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevents the data that the user inputs from loosing while refreshing the page 
        setError('');
        if (!email || !pass) {
            setError('Please enter both email and password.');
            return;
        }
        const response = await axiosInstance.post('api/v1/auth/signin', {
            email: String(email),
            password: String(pass)
        },{ withCredentials: true }).then((res) => {
            return res;
        }).catch((err) => { console.log("AxiosErrr") })

        if (response && response.status === 200) {
            // Authentication successful
             // Dispatch the action to update Redux state
            dispatch(loginUser(response.data.user));  // Dispatch user info to Redux state
            localStorage.setItem('authToken', response.data.token);
            alert('Login successful!');
            setemail('');
            setpass('');
            navigate("/home");
        }
        else {
            // Authentication failed
            setError('Invalid email or password.');
        }

    }

    return (
        <>
            <div className='login-container'>
                <div className='login-form'>
                    <form className='login-content' onSubmit={handleSubmit}>
                        <div className="login-page">
                            <div className='text-center'>
                                <h3 className='login-title'> Login</h3>
                            </div>
                            <label htmlFor="exampleInputEmail1" className='py-2'>Email address</label>
                            <input value={email} onChange={(e) => { setemail(e.target.value) }} type="email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                            <label htmlFor="exampleInputPassword1" className="py-2">Password</label>
                            <input value={pass} onChange={(e) => { setpass(e.target.value) }} type="password" id="exampleInputPassword1" placeholder="Password" />
                            {error && <p className="error-message" style={{ color: "red" }}>{error}</p>}

                            <button type="submit" className='login-button'>Log In</button>

                        </div>

                    </form>
                    <div className='m-3 d-flex justify-content-center'>
                        <button className='text-center text-dark mb-3 btn' >
                            Don't have an account?  <Link to="/register" style={{ color: "#7a55ff" }} className="mx-1">
                            Register here
                        </Link>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
