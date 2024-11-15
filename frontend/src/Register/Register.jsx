import React, { useState } from 'react'
import Validate from './Validate';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../Component/Redux/actions';
import axiosInstance from '../config/axiosConfig';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const inputValues = [{
        name: "name",
        id: '0',
        label: "Full Name",
        type: "text",
        placeholder: "Enter full name"
    }, {
        id: '1',
        name: "email",
        label: "Email",
        type: "text",
        placeholder: "Enter email"
    }, {
        id: '2',
        name: "password",
        label: "Password",
        type: "password",
        placeholder: "Enter password"
    }, {
        id: '3',
        name: "confirmpassword",
        label: "Confirm Password",
        type: "password",
        placeholder: "Enter confirm password"
    }]

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmpassword: ''
    });
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        const err = Validate(values);
        setErrors(err)
        try {

            if (Object.keys(err).length === 0) {
                const response = await axiosInstance.post('api/v1/auth/signup', {
                    username: String(values.name),
                    email: String(values.email),
                    password: String(values.password)
                },{ withCredentials: true })
                    .then()
                    .catch((err) => {
                        alert("Error");

                    })
    
                if ((response && response.status === 200) || response.status === 201) {
                    // Registration successful
                    localStorage.setItem('authToken', response.data.token);
                    dispatch(loginUser(response.data.user));  // Dispatch user info to Redux state
                    alert('Registration successful!');

                    setValues({
                        name: '',
                        email: '',
                        password: '',
                        confirmpassword: ''
                    });
                    navigate("/home");
                } else {
                    throw new Error('Registration failed.');
                }
            }

        } catch (error) {
            console.log(error);
        }
    }

    const handleInput = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }
    return (

        <>
            <div className='login-container'>
                <div className='login-form'>
                    <form className='login-content' onSubmit={handleSubmit}>
                        <div className="login-page">
                            <div>
                                <h3 className='text-center login-title'> Register</h3>
                            </div>

                            {
                                inputValues.map((element, index) => {
                                    return (
                                        <div key={index}>

                                            <label className='py-2'>{element.label}</label>
                                            <input value={values[element.name]} onChange={handleInput} name={element.name} type={element.type} placeholder={element.placeholder} />
                                            {errors && <small style={{ color: "red" }}>{errors[element.name]}</small>}
                                        </div>


                                    )
                                })
                            }

                            <button type="submit" className="login-button" >Register</button>
                        </div>
                        <div className='d-flex justify-content-center'>

                        </div>

                    </form>
                    <button className='text-center text-dark mb-3 btn'>
                        Already have an account? <a style={{ color: " #7a55ff" }} className='mx-1' href='/'>Log in here</a>.
                    </button>

                </div>
            </div>

        </>
    )
}

export default Register
