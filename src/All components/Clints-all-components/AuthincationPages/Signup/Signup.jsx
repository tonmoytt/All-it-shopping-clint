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
    <div className="min-h-screen bg-[#0f1e2e] flex items-center justify-center p-6">
      <div className="bg-[#0f1e2e] text-white rounded-lg overflow-hidden shadow-xl w-full max-w-7xl flex flex-col md:flex-row">

        {/* Left Side */}
        <div className="w-full md:w-1/2 relative p-10 flex items-center justify-center bg-[#0f1e2e]">
          {/* Decorative Shapes */}
          <div className="absolute top-0 left-0 w-16 h-16 bg-white rounded-br-full"></div>
          <div className="absolute top-24 right-[133px] z-50 w-12 h-12 bg-[#ff7043] rounded-bl-[60px] rotate-15"></div>
          <div className="absolute bottom-[-80px] left-[-40px] w-80 h-80 bg-[#ff7043] rounded-full opacity-90"></div>
          <div className="absolute bottom-0 right-[-20px] w-32 h-32 bg-white rounded-tl-full"></div>
          <div className="absolute left-[-30px] top-1/2 transform -translate-y-1/2 w-16 h-16 bg-[#ff7043] rounded-full"></div>

          {/* Image & Text */}
          <div className="relative z-10 text-center">
            <div className="w-80 h-80 overflow-hidden mx-auto mb-6">
              <img
                src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg"
                alt="person"
                className="w-full h-full object-cover rounded-bl-[80px] rounded-tr-[80px]"
              />
            </div>
            <h2 className="text-start -ml-36 text-3xl font-bold">
              Let’s Make it <br /> Happen Together!
            </h2>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="w-full md:w-1/2 bg-[#0f1e2e] px-10 py-8">
          <div className="text-right text-base font-sans mb-2">
            Already have an account?{" "}
            <Link to="/login" className="text-[#ff7043] underline">
              Sign in here!
            </Link>
          </div>

          <h2 className="text-2xl text-[#ff7043] font-bold mb-6">Create An Account</h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="First Name" name="firstname" type="text" placeholder="Enter your first name" />
              <InputField label="Last Name" name="lastname" type="text" placeholder="Enter your last name" />
              <InputField label="Email" name="email" type="email" placeholder="Enter your email" />
              <InputField label="Address" name="address" type="text" placeholder="Enter your address" />
              <InputField label="Create Password" name="password" type="password" placeholder="Create password" />
              <InputField label="Confirm Password" name="confirmpassword" type="password" placeholder="Confirm password" />
            </div>

            {/* Terms Checkbox */}
            <div className="mt-4 text-base font-sans">
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
          <div className="grid grid-cols-2 gap-4 mt-4">
            <button className="bg-[#3b5998] py-2 rounded text-white hover:opacity-90 text-base font-sans">
              Sign up using Facebook
            </button>
            <button
              onClick={googleHandle}
              className="bg-[#00acee] py-2 rounded text-white hover:opacity-90 text-base font-sans"
            >
              Sign up using Google
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
