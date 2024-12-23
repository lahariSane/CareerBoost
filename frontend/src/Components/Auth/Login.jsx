// import React from "react";
// import { Divider } from "@mui/material";
// import axios from "axios";

// const Login = () => {
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     // Handle login logic here
//     const response = await axios.post(`${process.env.REACT_APP_API}/auth/login`, {
//       email: e.target.email.value,
//       password: e.target.password.value,
//     });
//     console.log(response.data);
//   };

//   const handleGoogleLogin = () => {
//     // Handle Google sign-in logic here
//   };

//   const handleGitHubLogin = () => {
//     // Handle GitHub sign-in logic here
//   };

//   return (
//     <form onSubmit={handleLogin} className="space-y-4 px-4 flex flex-col items-center">
//       <div className="w-full">
//         <label htmlFor="email" className="block text-sm font-medium text-tertiary-dark">
//           Email
//         </label>
//         <input
//           type="email"
//           id="email"
//           className="block w-full px-3 py-2 border border-tertiary-dark rounded-md shadow-sm focus:outline-none focus:ring-secondary-blue focus:border-secondary-blue"
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
//           className="block w-full px-3 py-2 border border-tertiary-dark rounded-md shadow-sm focus:outline-none focus:ring-secondary-blue focus:border-secondary-blue"
//           required
//         />
//       </div>
//       <button
//         type="submit"
//         className="w-1/2 py-2 px-4 bg-secondary-beige text-tertiary-dark rounded-md hover:bg-secondary-dark"
//       >
//         Log In
//       </button>
//       <Divider className="w-full">OR</Divider>
//       <div className="w-full flex flex-col justify-between items-center mt-4">
//         <button
//           type="button"
//           onClick={handleGoogleLogin}
//           className="w-3/4 mt-2 py-2 px-4 bg-secondary-mauve text-white rounded-md hover:bg-secondary-green"
//         >
//           Sign in with Google
//         </button>
//         <button
//           type="button"
//           onClick={handleGitHubLogin}
//           className="w-3/4 mt-2 py-2 px-4 bg-secondary-mauve text-white rounded-md hover:bg-secondary-green"
//         >
//           Sign in with GitHub
//         </button>
//       </div>
//     </form>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { Divider } from "@mui/material";
import axios from "axios";

const Login = () => {
  // State variables for handling loading, errors, and user credentials
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    // Set loading state to true while the request is being processed
    setLoading(true);
    setError(null); // Reset any previous error messages

    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/auth/login`, {
        email,
        password,
      });

      // Handle successful login (you can save the token or user info in the state or localStorage)
      setLoading(false); // Set loading state to false after the response is received
      alert("Login successful");

      // Redirect or further actions after successful login, e.g., navigating to another page
    } catch (err) {
      setLoading(false); // Set loading state to false when an error occurs
      if (err.response && err.response.status === 401) {
        // Specific error handling for invalid credentials
        setError(err.response.data.message);
      } else {
        // General error handling (e.g., network issues)
        setError("Something went wrong. Please try again later.");
      }
      console.error(err); // Log the error for debugging
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4 px-4 flex flex-col items-center">
      <div className="w-full">
        <label htmlFor="email" className="block text-sm font-medium text-tertiary-dark">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Update email state on input change
          className="block w-full px-3 py-2 border border-tertiary-dark rounded-md shadow-sm focus:outline-none focus:ring-secondary-blue focus:border-secondary-blue"
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
          onChange={(e) => setPassword(e.target.value)} // Update password state on input change
          className="block w-full px-3 py-2 border border-tertiary-dark rounded-md shadow-sm focus:outline-none focus:ring-secondary-blue focus:border-secondary-blue"
          required
        />
      </div>

      {/* Display loading state */}
      <button
        type="submit"
        className="w-1/2 py-2 px-4 bg-secondary-beige text-tertiary-dark rounded-md hover:bg-secondary-dark"
        disabled={loading} // Disable the button while loading
      >
        {loading ? "Logging In..." : "Log In"} {/* Show loading text when logging in */}
      </button>

      {/* Display error message */}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <Divider className="w-full">OR</Divider>

      <div className="w-full flex flex-col justify-between items-center mt-4">
        <button
          type="button"
          className="w-3/4 mt-2 py-2 px-4 bg-secondary-mauve text-white rounded-md hover:bg-secondary-green"
        >
          Sign in with Google
        </button>
        <button
          type="button"
          className="w-3/4 mt-2 py-2 px-4 bg-secondary-mauve text-white rounded-md hover:bg-secondary-green"
        >
          Sign in with GitHub
        </button>
      </div>
    </form>
  );
};

export default Login;
