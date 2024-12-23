import React from "react";
import { Divider } from "@mui/material";

const Signup = () => {
  const handleSignup = (e) => {
    e.preventDefault();
    // Handle signup logic here
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
        <label htmlFor="name" className="block text-sm font-medium text-teriary-dark">
          Full Name
        </label>
        <input
          type="text"
          id="name"
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
          className="mt-1 block w-full px-3 py-2 border border-tertiary-dark rounded-md shadow-sm focus:outline-none focus:ring-secondary-blue focus:border-secondary-blue"
          required
        />
      </div>
      <button
        type="submit"
        className="w-1/2 py-2 px-4 bg-secondary-beige text-tertiary-dark rounded-md hover:bg-secondary-darkBeige"
      >
        Sign Up
      </button>
      
      <Divider className="w-full">OR</Divider>
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
