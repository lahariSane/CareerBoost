import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Login from "../Components/Auth/Login";
import Signup from "../Components/Auth/Signup";
import ForgotPassword from "../Components/Auth/ForgotPassword";
import OTPVerification from "../Components/Auth/OTPVerification";
import Illustration from "../Assests/undraw_engineering-team_13ax.svg";
import ResetPassword from "../Components/Auth/ResetPassword";
import careerboostlogo from '../Assests/careerboostlogo.png';

const LoginPage = () => {
    const [authState, setAuthState] = useState("login"); // "login", "signup", "forgotPassword", "otpVerification", "resetPassword"
    const location = useLocation(); // To access the current URL
    const navigate = useNavigate();

    useEffect(() => {
        // Check the path and update authState only when the URL changes
        if (location.pathname.split('/')[1] === 'reset-password') {
            setAuthState("resetPassword");
        } else {
            // Otherwise, use the current state from URL or fallback to "login"
            setAuthState(location.pathname.split('/')[1] || "login");
        }
    }, [location]); // This will run when the URL changes

    useEffect(() => {
        const token = localStorage.getItem("token");
        const redirectPath = sessionStorage.getItem("redirectAfterLogin");
        if (token && redirectPath) {
            sessionStorage.removeItem("redirectAfterLogin");
            navigate(redirectPath);
        }
    }, [navigate]);
    
    const renderAuthComponent = () => {
        switch (authState) {
            case "login":
                return <Login />;
            case "signup":
                return <Signup onSignupComplete={() => setAuthState("otpVerification")} />;
            case "forgotPassword":
                return <ForgotPassword />;
            case "otpVerification":
                return <OTPVerification handleSubmit={() => console.log("OTP Submitted!")} />;
            case "resetPassword":
                return <ResetPassword />;
            default:
                return <Login />;
        }
    };

    return (
        <div className="flex min-h-screen bg-primary items-center justify-center">
            {/* Logo */}
            <div 
                className="flex items-baseline justify-center absolute top-4 left-8"
                onClick={() => navigate("/")}>
                <img
                    src={careerboostlogo}
                    alt="Logo"
                    className="h-20 w-20 cursor-pointer"
                />
            </div>
            <div className="relative w-[70%] flex items-center justify-center bg-primary-light rounded-2xl h-[650px] shadow-2xl">
                {/* Left Section */}
                <div
                    className={`w-full md:w-1/2 flex-1 flex flex-col justify-center items-center p-8 ${authState === "signup" ? "order-2 translate-x-0" : "order-1 translate-x-0"} transition-all duration-[300ms] ease-in-out`}
                >
                    {/* Auth Form */}
                    <div className="bg-primary-light shadow-[0px_10px_10px_rgba(0,0,0,0.25)] rounded-xl p-6 w-full max-w-md border-[2px] border-solid border-bg-primary-light">
                        <h2 className="text-2xl font-bold text-center mb-4">
                            {authState === "login" && "LOG IN"}
                            {authState === "signup" && "SIGN UP"}
                            {authState === "forgotPassword" && "Forgot Password"}
                            {authState === "otpVerification" && "OTP Verification"}
                            {authState === "resetPassword" && "Reset Password"}
                        </h2>
                        {renderAuthComponent()}
                        <p className="text-gray-500 text-sm mt-4 text-center">
                            {authState === "login" && (
                                <>
                                    Don’t have an account?
                                    <button
                                        className="text-blue-500 hover:underline"
                                        onClick={() => setAuthState("signup")}
                                    >
                                        Sign Up
                                    </button>
                                    <br />
                                    <button
                                        className="text-blue-500 hover:underline mt-2"
                                        onClick={() => setAuthState("forgotPassword")}
                                    >
                                        Forgot Password?
                                    </button>
                                </>
                            )}
                            {authState === "signup" && (
                                <>
                                    Already have an account?
                                    <button
                                        className="text-blue-500 hover:underline"
                                        onClick={() => setAuthState("login")}
                                    >
                                        Log In
                                    </button>
                                </>
                            )}
                            {authState === "forgotPassword" && (
                                <>
                                    Remembered your password?
                                    <button
                                        className="text-blue-500 hover:underline"
                                        onClick={() => setAuthState("login")}
                                    >
                                        Log In
                                    </button>
                                </>
                            )}
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="mt-4 text-center text-gray-500 text-sm">
                        &copy; 2024 Resume Scorer. All rights reserved.
                    </div>
                </div>

                {/* Right Section */}
                <div
                    className={`hidden md:block w-1/2 flex items-center justify-center ${authState === "signup" ? "order-1" : "order-2"}`}
                >
                    <img
                        src={Illustration}
                        alt="Illustration"
                        className="w-3/4 mx-auto h-full"
                    />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
