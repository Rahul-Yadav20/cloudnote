import React, { useState } from 'react'

import { FaEye, FaEyeSlash } from "react-icons/fa";

import { useFormik } from "formik";
import registerSchema from '../schemas';
import SignupVideo from '../../images/Signup.mp4'
import { useNavigate } from 'react-router-dom';

function Signup(props) {
    const formData = {
        name: "",
        email: "",
        password: "",
        confirm_password: ""
    }
    
    const navigate = useNavigate();
    

    const { values, handleChange, handleBlur, errors, touched, handleReset } = useFormik({
        initialValues: formData,
        validationSchema: registerSchema,
        onSubmit: (values) => {
            console.log(values);
        }
    });

    const [type, setType] = useState('password');

    const toggleEye = () => {
        if (values.confirm_password != '') {

            if (type === 'password') {
                setType("text");

            }
            else {
                setType('password')
            }
        }
    }

    const host = "http://localhost:5000";


    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/createUser`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ name: values.name, email: values.email, password: values.password })
        });

        if (response.status===200) {
            
            const json = await response.json();
            // console.log(json);
            navigate("/")
            localStorage.setItem("token", json.authToken)
            // console.log(json);
            props.showAlert("Registration completed", "success");
        }else{
           props.showAlert(json, "error");
        }
    }

    // console.log(errors);



    return (
        <div className='flex h-screen  justify-around mx-auto pt-10 px-10 bg-gray-50'>
            <video src={SignupVideo} className='w-[600px] h-[80%] lg:block md:hidden xsm:hidden' autoPlay muted></video>




            {/* Registration form */}
            <form onSubmit={handleSubmit} className=' w-10/12  md:w-1/2 lg:w-1/3 h-2/3 flex flex-col gap-2 shadow-teal-400  shadow-md p-4 rounded-lg overflow-auto'>

                <h1 className='text-black text-center font-medium text-3xl my-4'>Registration Form</h1>
                {/* Name Field */}
                <label htmlFor="name">Name</label>
                <input type="text" className='rounded-md h-10 ps-4 text-black focus:outline-orange-400' name="name" id="name" value={values.name} onChange={handleChange} onBlur={handleBlur} placeholder="Enter full name" />
                {/* Error handling  using registerSchema*/}
                {(errors.name && touched.name && values.name !== '') ? <p className="text-yellow-400 font-medium">{errors.name}</p> : null}

                {/* Email Field */}
                <label htmlFor="mail">Email</label>
                <input type="email" className='rounded-md h-10 ps-4 text-black focus:outline-orange-400' name="email" id="mail" value={values.email} onChange={handleChange} onBlur={handleBlur} placeholder="email@xyz.com" />
                {/* Error handling  using registerSchema*/}
                {(errors.email && touched.email && values.email !== '') ? <p className="text-yellow-400 font-medium">{errors.email}</p> : null}

                {/* Password Field */}
                <label htmlFor="pass">Password</label>
                <div className="flex">
                    <input type="text" className='rounded-md h-10 ps-4 text-black focus:outline-orange-400 w-full' name="password" value={values.password} id="pass" onChange={handleChange} onBlur={handleBlur} placeholder="Enter password" />
                </div>
                {/* Error handling  using registerSchema*/}
                {(errors.password && touched.password && values.password !== '') ? <p className="text-yellow-400 font-medium">{errors.password}</p> : null}

                {/* Confirm Password Field */}
                <label htmlFor="confirm_password">Confirm Password</label>
                <div className="flex">
                    <input type={type} className='rounded-md h-10 ps-4 text-black focus:outline-orange-400 w-full' name="confirm_password" value={values.confirm_password} id="confirm_password" onChange={handleChange} onBlur={handleBlur} placeholder="Enter confirm password" />

                    <span className="flex justify-around items-center text-black cursor-pointer" onClick={toggleEye}>

                        {(type != 'password') ?
                            <FaEyeSlash className='absolute mr-10'></FaEyeSlash>  : <FaEye className='absolute mr-10'></FaEye>
                        }
                    </span>
                </div>

                {/* Error handling  using registerSchema*/}
                {(errors.confirm_password && touched.confirm_password && values.confirm_password !== '') ? <p className="text-yellow-400 font-medium">{errors.confirm_password}</p> : null}

                {/* Submit Button */}
                <div className="flex space-x-4">

                    <button type='submit' className='bg-cyan-600 p-2 rounded-md text-white w-24 mt-4 font-medium disabled:opacity-70 disabled:bg-orange-400' disabled={(!values.name || !values.email || !values.password || !values.confirm_password || !(values.password===values.confirm_password))}>Submit</button>

                    <button type='reset' onClick={handleReset} className='bg-red-600 p-2 rounded-md text-white w-24 mt-4 font-medium'>Reset</button>
                </div>

            </form>

        </div>
    )
}

export default Signup


