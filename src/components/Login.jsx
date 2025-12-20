import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaSpinner, FaEye, FaEyeSlash } from "react-icons/fa";
import login_ref_2 from "../assets/login_ref_2.jpg";
import myntraLogo from "../assets/logo.png";
import axios from "axios";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 👁️ State to toggle password visibility
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!credentials.email || !credentials.password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://ecomm-backend-latest-syi6.onrender.com/login",
        {
          email: credentials.email,
          password: credentials.password,
        },
        {
          headers: { "Content-Type": "application/json" },
          timeout: 10000,
        }
      );

      const responseData = response.data;
      const token =
        responseData.accessToken ||
        responseData.token ||
        responseData.access_token ||
        responseData.data?.token ||
        responseData.content?.token;

      const refresh_token = responseData.refreshToken;

      const user =
        responseData.user ||
        responseData.data?.user ||
        responseData.content?.user;

      if (!token) {
        throw new Error("Authentication token not received from server");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("refresh-token", refresh_token);

      if (user) {
        const firstName =
          user.firstName ||
          (user.name?.split(" ")[0]) ||
          user.username?.split(" ")[0] ||
          user.email?.split("@")[0] ||
          "User";

        localStorage.setItem("user", JSON.stringify({ name: firstName }));

        if (keepSignedIn) {
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("user", JSON.stringify({ name: firstName }));
        }
      }

      navigate("/");
    } catch (err) {
      let errorMessage = "Login failed. Please try again.";

      if (err.response) {
        if (err.response.status === 401) {
          errorMessage = "Invalid email or password";
        } else if (err.response.data?.error) {
          errorMessage = err.response.data.error;
        } else if (err.response.data?.message) {
          errorMessage = err.response.data.message;
        } else {
          errorMessage = `Server error (${err.response.status})`;
        }
      } else if (err.request) {
        errorMessage = "Network error. Please check your connection.";
      } else if (err.message?.includes("timeout")) {
        errorMessage = "Request timed out. Please try again.";
      } else {
        errorMessage = err.message || errorMessage;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-pink-100 px-2 py-2">
      <div className="bg-white rounded-3xl shadow-2xl flex w-full max-w-[650px] overflow-hidden">
        {/* Form Section */}
        <div className="w-full md:w-1/2 p-6">
          <div className="flex items-center justify-center mb-4">
            <img src={myntraLogo} alt="Logo" className="w-10 h-7" />
            <span className="text-sm font-bold text-pink-500">Myntra</span>
          </div>

          <h2 className="text-md font-bold text-center text-purple-900 mb-1">
            Welcome to India's Largest Online Fashion Store
          </h2>
          <p className="text-center text-sm text-purple-500 mb-4">
            Please login to your account
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div className="relative">
              <FaEnvelope className="absolute top-4 left-4 text-purple-400" />
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="w-full pl-11 pr-2 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-sm"
                disabled={loading}
              />
            </div>

            {/* Password with Eye Toggle */}
            <div className="relative">
              <FaLock className="absolute top-4 left-4 text-purple-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                className="w-full pl-11 pr-10 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-sm"
                disabled={loading}
              />
              <div
                className="absolute top-3 right-3 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            {/* Keep Signed In & Forgot Password */}
            <div className="flex items-center justify-between text-sm text-gray-600">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={keepSignedIn}
                  onChange={(e) => setKeepSignedIn(e.target.checked)}
                  disabled={loading}
                />
                Keep me signed in
              </label>
              <a href="#" className="text-pink-600 hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-2 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                {error}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                backgroundColor: loading ? "#d1d5db" : "#ec4899",
                color: "white",
                padding: "12px",
                borderRadius: "12px",
                fontWeight: "bold",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "background-color 0.3s",
              }}
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Terms */}
          <p className="text-xs text-center text-gray-500 mt-4">
            By continuing, you agree to our{" "}
            <span className="text-pink-700 underline cursor-pointer">
              Terms of Use
            </span>{" "}
            and{" "}
            <span className="text-pink-700 underline cursor-pointer">
              Privacy Policy
            </span>
            .
          </p>

          {/* Sign Up Link */}
          <p className="text-sm text-center mt-4">
            New here?{" "}
            <span
              onClick={() => !loading && navigate("/SignUp")}
              className={`text-blue-900 font-semibold cursor-pointer hover:underline ${
                loading ? "opacity-50" : ""
              }`}
            >
              Sign Up
            </span>
          </p>
        </div>

        {/* Image Section */}
        <div className="hidden md:block md:w-1/2">
          <img
            src={login_ref_2}
            alt="Login"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
