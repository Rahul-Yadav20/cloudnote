import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import registerSchema from '../schemas';
import SignupVideo from '../../images/Signup.mp4'
import { NavLink, useNavigate, } from 'react-router-dom';

function Login(props) {
  const formData = {
    email: "",
    password: "",
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
    if (values.password != '') {
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
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ email: values.email, password: values.password })
    });

    const json = await response.json();
    if (json.success) {
      props.showAlert("Login Successfully", "info");
      localStorage.setItem("token", json.authToken);
      navigate("/")
    }
    else {
      props.showAlert(json, "error")
    }
  }

  return (
    <div className='flex h-full justify-around mx-auto pt-10 px-10 bg-gray-50'>
      <video src={SignupVideo} className='w-[600px] h-[600px] lg:block md:hidden xsm:hidden' autoPlay muted></video>

      {/* Login form */}
      <form onSubmit={handleSubmit} className='w-10/12 md:w-1/2 lg:w-1/3 h-[400px] flex flex-col gap-2 shadow-teal-400 shadow-md p-4 rounded-lg overflow-auto'>
        <h1 className='text-black text-center font-medium text-3xl my-4'>Login</h1>

        {/* Email Field */}
        <label htmlFor="mail">Email</label>
        <input type="email" className='rounded-md h-10 ps-4 text-black focus:outline-orange-400' name="email" id="mail" value={values.email} onChange={handleChange} onBlur={handleBlur} placeholder="email@xyz.com" />
        {/* Error handling using registerSchema*/}
        {(errors.email && touched.email && values.email !== '') ? <p className="text-yellow-400 font-medium">{errors.email}</p> : null}

        {/* Password Field */}
        <label htmlFor="pass">Password</label>
        <div className="flex">
          <input type={type} className='rounded-md h-10 ps-4 text-black focus:outline-orange-400 w-full' name="password" value={values.password} id="pass" onChange={handleChange} onBlur={handleBlur} placeholder="Enter password" />
          {values.password && <span className="flex justify-around items-center text-black cursor-pointer" onClick={toggleEye}>
            {(type != 'password') ?
              <FaEyeSlash className='absolute mr-10'></FaEyeSlash> : <FaEye className='absolute mr-10'></FaEye>
            }
          </span>}
        </div>
        {/* Error handling using registerSchema*/}
        {(errors.password && touched.password && values.password !== '') ? <p className="text-yellow-400 font-medium">{errors.password}</p> : null}

        {/* Submit Button */}
        <div className="flex space-x-4 items-center">
          <button type='submit' className='bg-cyan-600 p-2 rounded-md text-white w-24 mt-4 font-medium disabled:opacity-70 disabled:bg-orange-400' disabled={(!values.email || !values.password)}>Submit</button>
          <NavLink to="/register" className="hover:underline text-blue-400 mt-5 hover:text-red-400">Resgister an account</NavLink>
        </div>
      </form>
    </div>
  )
}

export default Login