// import React from "react";
// import { Divider } from "@mui/material";

// const Signup = () => {
//   const handleSignup = (e) => {
//     e.preventDefault();
//     // Handle signup logic here
//   };

//   const handleGoogleSignup = () => {
//     // Handle Google sign-up logic here
//   };

//   const handleGitHubSignup = () => {
//     // Handle GitHub sign-up logic here
//   };

//   return (
//     <form onSubmit={handleSignup} className="space-y-4 flex flex-col items-center">
//       <div className="w-full">
//         <label htmlFor="name" className="block text-sm font-medium text-teriary-dark">
//           Full Name
//         </label>
//         <input
//           type="text"
//           id="name"
//           className="mt-1 block w-full px-3 py-2 border border-tertiary-dark rounded-md shadow-sm focus:outline-none focus:ring-secondary-blue focus:border-secondary-blue"
//           required
//         />
//       </div>
//       <div className="w-full">
//         <label htmlFor="email" className="block text-sm font-medium text-tertiary-dark">
//           Email
//         </label>
//         <input
//           type="email"
//           id="email"
//           className="mt-1 block w-full px-3 py-2 border border-tertiary-dark rounded-md shadow-sm focus:outline-none focus:ring-secondary-blue focus:border-secondary-blue"
//           required
//         />
//       </div>
//       <div className="w-full">
//         <label htmlFor="password" className="block text-sm font-medium text-tertiary-dark">
//           Password
//         </label>
//         <input
//           type="password"
//           id="password"
//           className="mt-1 block w-full px-3 py-2 border border-tertiary-dark rounded-md shadow-sm focus:outline-none focus:ring-secondary-blue focus:border-secondary-blue"
//           required
//         />
//       </div>
//       <button
//         type="submit"
//         className="w-1/2 py-2 px-4 bg-secondary-beige text-tertiary-dark rounded-md hover:bg-secondary-darkBeige"
//       >
//         Sign Up
//       </button>
      
//       <Divider className="w-full">OR</Divider>
//       <div className="w-full flex flex-col justify-between items-center mt-4">
//         <button
//           type="button"
//           onClick={handleGoogleSignup}
//           className="w-3/4 mt-2 py-2 px-4 bg-secondary-mauve text-white rounded-md hover:bg-secondary-green"
//         >
//           Sign up with Google
//         </button>
//         <button
//           type="button"
//           onClick={handleGitHubSignup}
//           className="w-3/4 mt-2 py-2 px-4 bg-secondary-mauve text-white rounded-md hover:bg-secondary-green"
//         >
//           Sign up with GitHub
//         </button>
//       </div>
//     </form>
//   );
// };

// export default Signup;


import React, { useState } from "react";
import { Divider } from "@mui/material";
import axios from "axios";

const Signup = () => {
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
      // Make the POST request for signing up
      const response = await axios.post(`${process.env.REACT_APP_API}/auth/register`, {
        name,
        email,
        password,
      });

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

  const handleGoogleSignup = () => {
    // Handle Google sign-up logic here
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
        <button
          type="button"
          onClick={handleGoogleSignup}
          className="w-3/4 mt-2 py-2 px-4 bg-secondary-mauve text-white rounded-md hover:bg-secondary-green"
        >
          Sign up with Google
        </button>
        <button
          type="button"
          onClick={handleGitHubSignup}
          className="w-3/4 mt-2 py-2 px-4 bg-secondary-mauve text-white rounded-md hover:bg-secondary-green"
        >
          Sign up with GitHub
        </button>
      </div>
    </form>
  );
};

export default Signup;
