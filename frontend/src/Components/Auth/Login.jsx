import React from "react";
import { Divider } from "@mui/material";

const Login = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  const handleGoogleLogin = () => {
    // Handle Google sign-in logic here
  };

  const handleGitHubLogin = () => {
    // Handle GitHub sign-in logic here
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
          className="block w-full px-3 py-2 border border-tertiary-dark rounded-md shadow-sm focus:outline-none focus:ring-secondary-blue focus:border-secondary-blue"
          required
        />
      </div>
      <button
        type="submit"
        className="w-1/2 py-2 px-4 bg-secondary-beige text-tertiary-dark rounded-md hover:bg-secondary-dark"
      >
        Log In
      </button>
      <Divider className="w-full">OR</Divider>
      <div className="w-full flex flex-col justify-between items-center mt-4">
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-3/4 mt-2 py-2 px-4 bg-secondary-mauve text-white rounded-md hover:bg-secondary-green"
        >
          Sign in with Google
        </button>
        <button
          type="button"
          onClick={handleGitHubLogin}
          className="w-3/4 mt-2 py-2 px-4 bg-secondary-mauve text-white rounded-md hover:bg-secondary-green"
        >
          Sign in with GitHub
        </button>
      </div>
    </form>
  );
};

export default Login;
