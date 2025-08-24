import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import auth from "../Firebase/Firebase.init";
import Swal from "sweetalert2";
import { Authconnect } from "../Authincation/Authincation";

const SignupPage = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { signupUser } = useContext(Authconnect);

  // ✅ Form Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.firstname.value.trim();
    const lastname = form.lastname.value.trim();
    const email = form.email.value.trim().toLowerCase();
    const password = form.password.value;
    const confirmPassword = form.confirmpassword.value;
    const address = form.address.value.trim();
    const checked = form.checkbox.checked;

    console.log("Signup with:", email, password);

    // 🔹 Validation
    if (!email) return setError("Email is required");
    if (!password) return setError("Password is required");
    if (!confirmPassword) return setError("Please confirm your password");
    if (password !== confirmPassword) return setError("Passwords do not match");
    if (password.length < 6) return setError("Password must be at least 6 characters");

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) return setError("Invalid email address");

    if (!checked) return setError("Please accept our terms and conditions");

    setError("");
    setSuccess("");

    try {
      // 🔹 Firebase Auth Create
      const result = await signupUser(email, password);

      // 🔹 Save to Backend
      const user = { name, lastname, email, password, address };
      const response = await axios.post("https://al-it-server.vercel.app/signup", user);

      // শুধু signup সফল হলে JWT রিকোয়েস্ট যাবে
      if (response.status >= 200 && response.status < 300) {
        await axios.post(
          "https://al-it-server.vercel.app/jwt",
          { email: user.email },
          { withCredentials: true }
        );

        setSuccess("Signup successful!");
        form.reset();

        Swal.fire({
          icon: "success",
          title: "Signup Successful!",
          text: `Welcome ${result.user.email}`,
        });

        navigate("/");
      }
    } catch (err) {
      console.error("Signup Error:", err.response?.data || err.message);

      if (err.response?.status === 409) {
        Swal.fire({
          icon: "error",
          title: "Email Already Used!",
          text: "Please use a different email address.",
        });
      } else {
        setError(err.response?.data?.message || "Signup failed. Please try again.");
      }
    }

  };

  // ✅ Google Signup
  const googleHandle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);

      Swal.fire({
        title: "Logged in with Google!",
        icon: "success",
        timer: 3000,
        showConfirmButton: false,
        background: "#f0fdf4",
        color: "#064e3b",
      });

      navigate("/");
    } catch (error) {
      console.error("Google Login Error:", error);
      Swal.fire({
        title: "Google Login Failed!",
        text: error.message,
        icon: "error",
        confirmButtonText: "Try Again",
        confirmButtonColor: "#ef4444",
        background: "#fef2f2",
        color: "#991b1b",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1e2e] flex items-center justify-center px-6 pt-3">
      <div className="bg-[#0f1e2e] text-white rounded-lg overflow-hidden shadow-xl w-full max-w-7xl flex flex-col md:flex-row">

        {/* Left Side */}
       


          <div className="  w-full md:pt-40  md:w-1/2 relative p-6 sm:p-8 md:p-10 flex flex-col items-center justify-center bg-[#0f1e2e] overflow-hidden">
           <div className="hidden md:block">
            {/* Decorative Shapes */}
            <div className="absolute top-0 left-0 w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-br-full"></div>
            <div className="absolute top-40 sm:top-24 right-[20px] sm:right-[133px] z- w-8 h-8 sm:w-12 sm:h-12 bg-[#ff7043] rounded-bl-[60px] rotate-15"></div>
            <div className="absolute bottom-[-50px] sm:bottom-[-80px] left-[-20px] sm:left-[-40px] w-40 h-40 sm:w-80 sm:h-80 bg-[#ff7043] rounded-full opacity-90"></div>
            <div className="absolute bottom-0 right-[-10px] sm:right-[-20px] w-20 h-20 sm:w-32 sm:h-32 bg-white rounded-tl-full"></div>
            <div className="absolute left-[-15px] sm:left-[-30px] top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-16 sm:h-16 bg-[#ff7043] rounded-full"></div>

            {/* Image & Text */}
            <div className=" relative z-10 text-center md:text-left">
              <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 overflow-hidden mx-auto mb-4 sm:mb-6">
                <img
                  src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg"
                  alt="person"
                  className="w-full h-full object-cover rounded-bl-[50px] sm:rounded-bl-[60px] md:rounded-bl-[80px] rounded-tr-[50px] sm:rounded-tr-[60px] md:rounded-tr-[80px]"
                />
              </div>
              <h2 className="text-center md:text-start text-2xl sm:text-3xl font-bold md:-ml-36 leading-snug">
                Let’s Make it <br /> Happen Together!
              </h2>
            </div>
          </div>
        </div>


        {/* Right Side Form */}
        <div className="   w-full md:w-1/2 bg-[#0f1e2e] px-3 md:py-10">
          <div className="hidden md:block text-right text-base font-sans mb-2">
            Already have an account?{" "}
            <Link to="/login" className="text-[#ff7043] underline">
              Sign in here!
            </Link>
          </div>

          <h2 className="text-[28px] md:text34xl text-[#ff7043] font-bold ">Create An Account</h2>
          <p className=" mb-4 text-xs justify-end flex">Have an account ?<span className="ml-1 underline text-[#ff7043]">Login</span> </p>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
              <InputField label="First Name" name="firstname" type="text" placeholder="Enter your first name" />
              <InputField label="Last Name" name="lastname" type="text" placeholder="Enter your last name" />
              <InputField label="Email" name="email" type="email" placeholder="Enter your email" />
              <InputField  label="Address" name="address" type="text" placeholder="Enter your address" />
              <InputField label="Create Password" name="password" type="password" placeholder="Create password" />
              <InputField label="Confirm Password" name="confirmpassword" type="password" placeholder="Confirm password" />
            </div>

            {/* Terms Checkbox */}
            <div className="mt-4 text-xs md:text-base font-sans ">
              <label className="flex items-start gap-2">
                <input name="checkbox" type="checkbox" className="mt-1" />
                <span>
                  Creating your account means you accept our{" "}
                  <a className="text-[#ff7043] underline" href="#">
                    Terms & Conditions
                  </a>.
                </span>
              </label>
            </div>

            {/* Error / Success */}
            {error && <p className="text-red-400 text-sm font-semibold text-center mt-2">{error}</p>}
            {success && <p className="text-green-400 text-sm font-semibold text-center mt-2">{success}</p>}

            <button type="submit" className="w-full bg-[#ff7043] text-white py-3 mt-6 rounded hover:opacity-90">
              Create Account
            </button>
          </form>

          {/* Social Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4">


             <button
              onClick={googleHandle}
              className="flex items-center justify-center gap-2 bg-[#00acee] py-2 rounded text-white hover:opacity-90 text-base font-sans transition duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 3l5.7-5.7C33.7 6.1 29.1 4 24 4 13.5 4 5 12.5 5 23s8.5 19 19 19 19-8.5 19-19c0-1.3-.1-2.5-.4-3.5z" />
                <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.4 16.2 18.9 14 24 14c3 0 5.7 1.1 7.8 3l5.7-5.7C33.7 6.1 29.1 4 24 4c-7.4 0-13.7 3.8-17.7 9.5z" />
                <path fill="#4CAF50" d="M24 43c5.1 0 9.7-1.9 13.2-5l-6.1-5.2c-2 1.6-4.6 2.5-7.1 2.5-5.2 0-9.6-3.3-11.3-8H6.3l-6.1 5.2C10.3 39.2 16.9 43 24 43z" />
                <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.7 2-2 3.8-3.7 5l6.1 5.2C40.1 35.9 43 30.9 43 25c0-1.3-.1-2.5-.4-3.5z" />
              </svg>
              Sign up Google
            </button>
            <button className="flex items-center justify-center gap-2 bg-[#3b5998] py-2 rounded text-white hover:opacity-90 text-base font-sans transition duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12.07C22 6.48 17.52 2 12 2S2 6.48 2 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.03H7.9v-2.9h2.54V9.41c0-2.5 1.5-3.88 3.78-3.88 1.1 0 2.25.2 2.25.2v2.48h-1.27c-1.25 0-1.64.78-1.64 1.57v1.89h2.8l-.45 2.9h-2.35v7.03C18.34 21.25 22 17.09 22 12.07z" />
              </svg>
              Sign up Facebook
            </button>

           
          </div>


          <p className="text-xs text-center mt-6">@copyright 2025. Company Inc ltd.</p>
        </div>
      </div>
    </div>
  );
};

// ✅ Small Reusable Input Component
const InputField = ({ label, name, type, placeholder }) => (
  <div className="flex flex-col">
    <label className="text-base font-sans mb-1">{label}</label>
    <input
      type={type}
      name={name}
      required
      placeholder={placeholder}
      className="p-2 rounded bg-[#f8fbfd] text-gray-400"
    />
  </div>
);

export default SignupPage;
