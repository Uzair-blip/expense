"use client"; // Ensures that this file is treated as a client-side component in Next.js
import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"; // Import Firebase methods for authentication
import { auth } from "../../lib/firebase"; // Import Firebase authentication instance from your firebase.js config
import { useRouter } from "next/navigation"; // Import useRouter hook for redirection

const Login = () => {
  // State hooks for managing input fields and UI state
  const [isLogin, setIsLogin] = useState(true); 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [error, setError] = useState(""); 
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const router = useRouter(); // Get the router instance for navigation

  // Handle form submission for either login or sign-up
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the page from reloading when the form is submitted
    setError("");

    if (!email || !password || (!isLogin && !confirmPassword)) {
      setError("Please fill in all fields."); // If any fields are missing, show an error
      return;
    }

    
    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match."); 
      return;
    }

    try {
      // Conditional logic for login or sign-up
      if (isLogin) {
        // If in login mode, attempt to sign in the user with Firebase Authentication
        await signInWithEmailAndPassword(auth, email, password); // Firebase login function
        console.log("Logging in with:", { email, password });
        router.push("/dashboard"); // This navigates the user to the dashboard
      } else {
        // If in sign-up mode, attempt to create a new user with Firebase Authentication
        await createUserWithEmailAndPassword(auth, email, password); // Firebase sign-up function
        console.log("Signing up with:", { email, password });
        alert("Sign Up successful!");
      }
    } catch (error) {

      setError(error.message);
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen flex items-center justify-center">
      {/* The container for the login/signup form */}
      <div className="bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-sm">
        {/* Title of the form */}
        <h1 className="text-2xl font-bold text-white text-center mb-4">
          {isLogin ? "Login" : "Sign Up"}
        </h1>
        
        {/* If there's an error, show the error message */}
        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}
        
        {/* Form for email and password inputs */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Email input */}
            <input
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Updates email state when user types
              required // Ensures the input is required
            />
            {/* Password input */}
            <input
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              placeholder="Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Updates password state when user types
              required // Ensures the input is required
            />
            {/* Confirm password input (only for sign-up) */}
            {!isLogin && (
              <input
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} // Updates confirmPassword state when user types
                required // Ensures the input is required for sign-up
              />
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full mt-6 px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {isLogin ? "Log In" : "Sign Up"} {/* Button text changes based on login/signup state */}
          </button>
        </form>

        {/* Link to toggle between login and sign-up forms */}
        <p className="text-gray-400 text-sm text-center mt-4">
          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"} {/* Text changes based on login/signup state */}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)} // Toggles the state between login and sign-up
            className="text-blue-500 hover:underline focus:outline-none"
          >
            {isLogin ? "Sign Up" : "Log In"} {/* Button text changes based on login/signup state */}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
