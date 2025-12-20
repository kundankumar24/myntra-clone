import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import login_ref_6 from "../assets/login_ref_6.jpg";
import myntraLogo from "../assets/logo.png";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👁️ Toggle state
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedData = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      password: formData.password,
    };

    try {
      const response = await axios.post(
        "https://ecomm-backend-latest-syi6.onrender.com/register",
        trimmedData
      );

      if (response.status === 200 || response.status === 201) {
        const fullName = `${trimmedData.firstName} ${trimmedData.lastName}`;
        localStorage.setItem("user", JSON.stringify({ name: fullName }));

        alert("Sign-up successful!");
        navigate("/login");
      } else {
        setError("Could not register. Try again.");
      }
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Server error or invalid data.");
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-pink-100 px-4 py-10">
      <div className="bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row max-w-xl overflow-hidden">
        {/* Form Section */}
        <div className="w-full md:w-1/2 p-5">
          <div className="flex items-center justify-center mb-4">
            <img src={myntraLogo} alt="Logo" className="w-10 h-7 mr-1" />
            <span className="text-sm font-bold text-pink-500">Myntra</span>
          </div>

          <h2 className="text-md font-bold text-center text-purple-900">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5 mt-4">
            {/* First Name */}
            <div className="relative">
              <FaUser className="absolute top-4 left-4 text-purple-400" />
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full pl-11 pr-2 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-sm"
              />
            </div>

            {/* Last Name */}
            <div className="relative">
              <FaUser className="absolute top-4 left-4 text-purple-400" />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full pl-11 pr-2 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-sm"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <FaEnvelope className="absolute top-4 left-4 text-purple-400" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-11 pr-2 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-sm"
              />
            </div>

            {/* Password with Eye Icon */}
            <div className="relative">
              <FaLock className="absolute top-4 left-4 text-purple-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-11 pr-10 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-sm"
              />
              <div
                className="absolute top-3 right-3 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-red-600 text-sm mt-1 text-center">{error}</p>
            )}

            {/* Sign Up Button */}
            <button
              type="submit"
              style={{
                width: "100%",
                backgroundColor: "#ec4899",
                color: "white",
                padding: "12px",
                borderRadius: "12px",
                fontWeight: "bold",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                border: "none",
                cursor: "pointer",
              }}
            >
              Sign Up
            </button>
          </form>

          {/* Redirect to Login */}
          <p className="text-sm text-center mt-6">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-900 font-semibold cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </div>

        {/* Image Section */}
        <div className="hidden md:block md:w-1/2">
          <img
            src={login_ref_6}
            alt="Sign Up"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
