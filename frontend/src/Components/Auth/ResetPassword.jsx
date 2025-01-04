import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // To access URL query parameters

const ResetPassword = () => {
    const { token } = useParams(); // Get token from URL
    // const [token, setToken] = useState(""); // State to store token from URL
    const [newPassword, setNewPassword] = useState(""); // State for new password
    const [confirmPassword, setConfirmPassword] = useState(""); // State for confirming password
    const [error, setError] = useState(""); // State for error messages
    const [success, setSuccess] = useState(false); // State to track success
    const [loading, setLoading] = useState(false); // State for loading spinner

    // useEffect(() => {
    //     // Extract the token from the URL query parameters
    //     console.log(location.search);
    //     const queryParams = new URLSearchParams(location.search);
    //     const tokenFromUrl = queryParams.get("token");
    //     setToken(tokenFromUrl); // Set token in state
    // }, [location]);

    const handleResetPassword = async (e) => {
        e.preventDefault();

        // Ensure both passwords match
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
        setError(""); // Clear any previous error messages

        try {
            // Make API call to reset password with the token
            const response = await axios.post(
                `${process.env.REACT_APP_API}/auth/updatepassword`,
                { newPassword },
                { headers: { Authorization: `Bearer ${token}` } } // Send token in the header
            );

            setSuccess(true); // Set success state to true upon successful password reset
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong.");
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className="space-y-4 max-w-md mx-auto">
            {success ? (
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-green-500">
                        Your password has been reset successfully!
                    </h2>
                </div>
            ) : (
                <form onSubmit={handleResetPassword} className="space-y-4">
                    {/* New Password Field */}
                    <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                            New Password
                        </label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    {/* Error Message */}
                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    {/* Reset Password Button */}
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        disabled={loading} // Disable button when loading
                    >
                        {loading ? "Processing..." : "Reset Password"}
                    </button>
                </form>
            )}
        </div>
    );
};

export default ResetPassword;