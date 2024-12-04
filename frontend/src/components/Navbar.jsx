import React, { useEffect, useState } from 'react'
// import { IoMenu } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";

import logo from '../images/logo.png'

import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

import { Menu, X } from 'lucide-react';


const NavMenu = () => {
    const loc = useLocation();
    // useEffect(() => {
    //     // console.log(loc);
    // }, [loc])

    return (
        <>
            <NavLink className={` hover:text-orange-400 text-xl ${loc.pathname == "/" ? "text-orange-400 md:underline  underline-offset-[10px] xsm:no-underline" : ""} `} to="/">Home</NavLink>
            <NavLink className={` hover:text-orange-400 text-xl ${loc.pathname == "/about" ? "text-orange-400 md:underline  underline-offset-[10px] xsm:no-underline" : ""} `} to="/about">About</NavLink>


        </>
    )
}

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    }

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        navigate("/login")
    }

    return (
        <>
            <nav className=" sticky top-0 z-50 w-full flex justify-between items-center bg-black text-white h-20 px-5">

                <div className="logo w-16 flex flex-col items-center">

                    <img src={logo} alt="" className='h-12 bg-cover' />
                    <p className='text-xs ms-3'>NoteKeeper</p>
                </div>

                <div className='hidden md:flex space-x-4 font-medium '>
                    {
                        (localStorage.getItem('token')) ? <NavMenu /> : ""

                    }
                </div>

                <div className='flex space-x-4'>
                    {/* If token is present(user logged in) in the local storage then show Logout button other show Login/Signup button */}
                    {
                        // Ternary Operator 
                        !(localStorage.getItem('token')) ?
                            // Login Signup
                            <div className='flex md:flex xsm:hidden text-white'><button type="button" className='p-2 active:scale-90 hover:underline underline-offset-4 decoration-orange-400'>
                                <NavLink to="/login">Login</NavLink>
                            </button>
                                <button type="button" className=' bg-orange-400 p-2 rounded-md active:scale-90 '>
                                    <NavLink to="/signup">SignUp</NavLink>
                                </button>
                            </div> // login Signup End
                            :
                            // Logout Button
                            <div className='flex items-center'>
                                <div className="dropdown dropdown-end z-50">
                                    <div tabIndex={0} role="button" className="btn m-1"><FaUserCircle /></div>
                                    <ul tabIndex={0} className="dropdown-content z-50 menu p-2 shadow bg-black rounded-box w-52">
                                        <li><Link to='/about' className='hover:text-orange-400'>Profile</Link></li>
                                        <li><Link to='/login' onClick={handleLogout} className='hover:text-orange-400'>Logout</Link></li>
                                    </ul>
                                </div>

                                <button type="button" className='flex md:flex xsm:hidden bg-orange-400 text-white p-2 rounded-md active:scale-90 focus:border-2 border-white' onClick={handleLogout}>
                                    Logout
                                </button>
                            </div>
                    }

                </div>


                <div className='md:hidden lg:hidden'>
                    <button onClick={toggleNavbar}>
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </nav>


            {isOpen && (
                <div className="flex flex-col items-center space-y-4 md:hidden xsm:no-underline bg-black bg-opacity-30 text-white pb-5 sticky top-20 z-20">
                    <NavMenu />
                    {
                        !(localStorage.getItem('token')) ? <div className='flex space-x-4'><button type="button" className='bg-orange-400 text-white p-2 rounded-md active:scale-90 focus:border-2 border-white'>
                            <NavLink to="/signup" >SignUp</NavLink>
                        </button><button type="button" className='bg-orange-400 text-white p-2 rounded-md active:scale-90 focus:border-2 border-white'>
                                <NavLink to="/login">Login</NavLink>
                            </button></div> : ""


                    }


                </div>
            )}
        </>


    )
}

export default Navbar
