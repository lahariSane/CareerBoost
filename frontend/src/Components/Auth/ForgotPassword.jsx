import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false); // New state for loading

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the request starts

    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/auth/resetpassword`, {
        email,
      });
      setSuccess(true); // Set success to true after a successful response
    } catch (error) {
      console.error("Error sending reset password email", error);
      setSuccess(false); // Optionally handle errors
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };

  return (
    <div>
      {!success ? (
        <form onSubmit={handleForgotPassword} className="space-y-4 flex flex-col items-center">
          <div className="w-full">
            <label htmlFor="email" className="block text-sm font-medium text-tertiary-dark">
              Enter your registered email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-tertiary-dark rounded-md shadow-sm focus:outline-none focus:ring-secondary-blue focus:border-secondary-blue"
              required
            />
          </div>
          <button
            type="submit"
            className="w-1/2 py-2 px-4 bg-secondary-beige text-tertiary-dark rounded-md hover:bg-secondary-darkBeige"
            disabled={loading} // Disable the button while loading
          >
            {loading ? (
              <span className="loader">Loading...</span> // Placeholder text for the loading state
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      ) : (
        <div className="text-center">
          <h2 className="text-xl font-semibold text-primary-light">
            Check Your Email
          </h2>
          <p className="text-secondary-beige">
            A password reset link has been sent to <strong>{email}</strong>. Please check your inbox.
          </p>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
