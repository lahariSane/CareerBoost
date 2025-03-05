import React, { useState } from "react";
import { Divider } from "@mui/material";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";

const Signup = ({ onSignupComplete }) => {
  // State variables for loading, errors, and user input fields
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    // Set loading state to true when signup starts
    setLoading(true);
    setError(null); // Reset error state

    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/auth/sendotp`, {
        name,
        email,
        password,
      });
      if(onSignupComplete) onSignupComplete();
      localStorage.setItem('token', response.data.token);

      // Handle successful signup (e.g., display success message, navigate to login, etc.)
      setLoading(false);
      alert("Signup successful! Please log in to continue.");

      // Perform further actions like redirecting user or displaying success messages
    } catch (err) {
      setLoading(false); // Set loading to false when error occurs
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); // Set error from backend response
      } else {
        setError("Something went wrong. Please try again later."); // Default error message
      }
      console.error(err); // Log error for debugging
    }
  };

  const handleGoogleSignup = async (response) => {
    // Handle Google sign-up logic here
    if (response.credential) {
      try {
        const res = await axios.post(`${process.env.REACT_APP_API}/auth/google`, {
          tokenId: response.credential,
        });

        // Handle successful signup (e.g., display success message, navigate to login, etc.)
        alert("Signup successful! Please log in to continue.");

        // Perform further actions like redirecting user or displaying success messages
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message); // Set error from backend response
        } else {
          setError("Something went wrong. Please try again later."); // Default error message
        }
        console.error(err); // Log error for debugging
      }
    }
  };

  const handleGitHubSignup = () => {
    // Handle GitHub sign-up logic here
  };

  return (
    <form onSubmit={handleSignup} className="space-y-4 flex flex-col items-center">
      <div className="w-full">
        <label htmlFor="name" className="block text-sm font-medium text-tertiary-dark">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)} // Update name state
          className="mt-1 block w-full px-3 py-2 border border-tertiary-dark rounded-md shadow-sm focus:outline-none focus:ring-secondary-blue focus:border-secondary-blue"
          required
        />
      </div>
      <div className="w-full">
        <label htmlFor="email" className="block text-sm font-medium text-tertiary-dark">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Update email state
          className="mt-1 block w-full px-3 py-2 border border-tertiary-dark rounded-md shadow-sm focus:outline-none focus:ring-secondary-blue focus:border-secondary-blue"
          required
        />
      </div>
      <div className="w-full">
        <label htmlFor="password" className="block text-sm font-medium text-tertiary-dark">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update password state
          className="mt-1 block w-full px-3 py-2 border border-tertiary-dark rounded-md shadow-sm focus:outline-none focus:ring-secondary-blue focus:border-secondary-blue"
          required
        />
      </div>

      {/* Signup Button */}
      <button
        type="submit"
        className="w-1/2 py-2 px-4 bg-secondary-beige text-tertiary-dark rounded-md hover:bg-secondary-darkBeige"
        disabled={loading} // Disable the button while loading
      >
        {loading ? "Signing Up..." : "Sign Up"} {/* Show loading text while signing up */}
      </button>

      {/* Display error message if there's an error */}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <Divider className="w-full">OR</Divider>

      {/* Google and GitHub Sign-Up Buttons */}
      <div className="w-full flex flex-col justify-between items-center mt-4">

        <GoogleLogin onSuccess={handleGoogleSignup} onFailure={(error) => setError(error)} />
        <button
          type="button"
          className="mt-2 py-2 px-2 bg-white text-black flex items-center justify-center"
          onClick={handleGitHubSignup}
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.113.793-.263.793-.587 0-.287-.012-1.243-.012-2.263-3.338.75-4.042-1.612-4.042-1.612-.544-1.387-1.331-1.75-1.331-1.75-1.087-.75.087-.75.087-.75 1.2.087 1.837 1.2 1.837 1.2 1.087 1.837 2.837 1.312 3.537 1 .113-.75.425-1.312.75-1.612-2.662-.3-5.462-1.337-5.462-5.925 0-1.312.462-2.4 1.2-3.262-.113-.3-.525-1.512.113-3.112 0 0 1.012-.3 3.3 1.2.975-.263 2.025-.375 3.075-.375 1.05 0 2.1.112 3.075.375 2.287-1.5 3.3-1.2 3.3-1.2.637 1.6.225 2.812.113 3.112.75.862 1.2 1.95 1.2 3.262 0 4.6-2.8 5.625-5.475 5.925.45.375.825 1.087.825 2.2 0 1.612-.012 2.912-.012 3.3 0 .337.188.712.8.587C20.562 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          Sign in with GitHub
        </button>
      </div>
    </form>
  );
};

export default Signup;
