import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleForgotPassword = (e) => {
    e.preventDefault();
    // Simulate API call or password reset logic
    setSuccess(true);
  };

  return (
    <div>
      {!success ? (
        <form onSubmit={handleForgotPassword} className="space-y-4">
          <div>
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
            className="w-full py-2 px-4 bg-secondary-beige text-tertiary-dark rounded-md hover:bg-secondary-darkBeige"
          >
            Reset Password
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
