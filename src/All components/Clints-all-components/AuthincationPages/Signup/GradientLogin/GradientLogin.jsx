import React, { useContext } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from 'react-type-animation';
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import auth from "../../Firebase/Firebase.init";
import { Authconnect } from "../../Authincation/Authincation";

const GradientLogin = () => {
    const navigate = useNavigate();
    const { Login } = useContext(Authconnect);  // নাম একই করে নাও

    const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

    const handleButton = async e => {
        e.preventDefault();

        const form = e.target;
        const email = form.email.value.toLowerCase();
        const password = form.password.value;

        if (!email || !password) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Email and password are required!',
                background: '#fef2f2',
                color: '#991b1b',
            });
        }

        if (!isValidEmail(email)) {
            return Swal.fire({
                icon: 'warning',
                title: 'Invalid Email',
                text: 'Please enter a valid email address.',
                background: '#fef2f2',
                color: '#991b1b',
            });
        }

        try {
            const result = await Login(email, password);
            Swal.fire({
                icon: 'success',
                title: 'Login Successful!',
                text: `Welcome ${result.user.email}`,
            });
            form.reset();
            navigate('/');
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: error.message || 'Please check your credentials.',
            });
        }
    };

    const googleHandle = async () => {
        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);
            Swal.fire({
                title: 'Logged in with Google!',
                icon: 'success',
                timer: 3000,
                showConfirmButton: false,
                background: '#f0fdf4',
                color: '#064e3b',
            });
            navigate('/');
        } catch (error) {
            Swal.fire({
                title: 'Google Login Failed!',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'Try Again',
                confirmButtonColor: '#ef4444',
                background: '#fef2f2',
                color: '#991b1b',
            });
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-500 p-0">
            <div className="w-[1111px] h-[600px] bg-white rounded-xl overflow-hidden shadow-lg flex">

                {/* Left Side */}
                <div className="w-[50%] h-full relative bg-gradient-to-br from-[#340B78] via-[#6618A4] to-[#E529C0] text-white px-8 py-10 flex flex-col justify-between overflow-hidden">
                    <div>
                        {/* Logo */}
                        <div className="flex items-center space-x-2 mb-10">
                            <div className="w-10 h-10 bg-white text-purple-700 rounded-full flex items-center justify-center font-bold text-lg">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-infinity">
                                    <path d="M18.178 8.178a4 4 0 0 1 0 5.644l-5.535 5.535a4 4 0 0 1-5.643 0l-1.071-1.071a4 4 0 0 1 0-5.644l5.535-5.535a4 4 0 0 1 5.644 0l1.07 1.07z" />
                                </svg>
                            </div>
                            <span className="text-lg font-semibold">CO.</span>
                        </div>

                        {/* Welcome text */}
                        <div className="space-y-2">
                            <div className="text-lg md:text-xl font-semibold mt-6 text-cyan-300 h-[50px] md:h-[60px]">
                                <TypeAnimation
                                    sequence={[
                                        'Welcome Our Community',
                                        5000,
                                        'Please Login',
                                        7000,
                                    ]}
                                    wrapper="span"
                                    cursor={true}
                                    repeat={Infinity}
                                />
                            </div>
                            <h1 className="text-3xl font-bold leading-snug text-cyan-00">Let's Make it Happen <br />Together!</h1>
                            <p className="text-md opacity-80 mt-20">Join the mission and create your space.</p>
                        </div>
                    </div>

                    <p className=" text-[10px]">WWW . AL_IT_SERVICE . COM</p>

                    {/* Decorative Elements */}
                    <motion.div
                        animate={{ x: [0, 20, 0], y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 5 }}
                        className="absolute w-32 h-32 bg-gradient-to-br from-cyan-300 to-purple-600 rounded-full top-12 left-16 opacity-50 blur-2xl"
                    />
                    <motion.div
                        animate={{ y: [0, -15, 0] }}
                        transition={{ repeat: Infinity, duration: 6 }}
                        className="absolute w-20 h-20 bg-pink-400 rounded-full bottom-32 left-4 opacity-60 blur-lg"
                    />
                    <motion.div
                        animate={{ x: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 4 }}
                        className="absolute w-10 h-10 bg-fuchsia-500 rounded-full bottom-8 right-8 opacity-70"
                    />
                    <motion.div
                        animate={{ x: [0, 10, 0], y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 7 }}
                        className="absolute w-16 h-16 bg-orange-400 rounded-full top-36 left-36 opacity-40 blur-sm"
                    />
                </div>

                {/* Right Side */}
                <div className="w-[50%] h-full bg-white px-12 py-16 flex flex-col justify-start">
                    <h2 className="text-2xl font-bold text-gray-800 mb-8">Sign In</h2>

                    <form onSubmit={handleButton} className="flex flex-col space-y-6">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            className="w-full border-b-2 border-pink-300 py-2 px-1 text-gray-800 bg-white focus:outline-none focus:border-pink-500"
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="w-full border-b-2 border-pink-300 py-2 px-1 text-gray-800 bg-white focus:outline-none focus:border-pink-500"
                        />
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 rounded-full font-semibold hover:opacity-90 mt-2"
                        >
                            CONTINUE →
                        </button>
                    </form>

                    <div className="text-center text-sm text-gray-400 my-3">
                        Don't have an account? <Link className="text-cyan-500" to='/signup'>Sign-Up</Link>
                    </div>
                    <div className="text-center text-sm text-gray-400">or Connect with Social Media</div>

                    <div className="flex flex-col space-y-3 mt-4">
                        <button onClick={googleHandle} className="bg-[#1DA1F2] text-white py-2 rounded-full font-medium">Sign In With Google</button>
                        <button className="bg-[#3b5998] text-white py-2 rounded-full font-medium">Sign In With Facebook</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GradientLogin;
