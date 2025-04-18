import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await response.json();
      console.log("Login Response:", data);
      if (response.ok) {
        alert("Login successful!");
        localStorage.setItem("isAuthenticated", "true");
        window.dispatchEvent(new Event("authChange"));
        setTimeout(() => navigate("/"), 500);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('/sky.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100vw",
      }}
      className="flex items-center justify-center font-[Inter]"
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative bg-white text-gray-800 p-12 rounded-2xl shadow-lg w-full max-w-lg"
      >
        <h2 className="text-3xl font-bold text-center">Log In</h2>
        <br></br>
        <p className="text-gray-600 text-center mb-6">
          🎉 Hey there, Little Explorer! 🎉<br />
          Welcome back to your magical learning world! 🚀✨<br />
          Your adventure is waiting—let’s jump in and have some fun! 🎮📚
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
            className="w-full p-4 bg-gray-200 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full p-4 bg-gray-200 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />

          <button
            type="submit"
            className="w-full p-4 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold"
          >
            Log In
          </button>
        </form>

        <div className="text-center mt-6">
          <p
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => navigate("/forgotPassword")}
          >
            Forgot Password?
          </p>
          <p className="text-gray-600 mt-3">
            Don't have an account?
            <span
              className="text-blue-500 cursor-pointer font-bold hover:underline"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default LoginPage;
