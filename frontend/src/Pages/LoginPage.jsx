import React, { useState } from "react";
import Login from "../Components/Auth/Login";
import Signup from "../Components/Auth/Signup";
import ForgotPassword from "../Components/Auth/ForgotPassword";
import OTPVerification from "../Components/Auth/OTPVerification";
import Illustration from "../Assests/undraw_engineering-team_13ax.svg";

const LoginPage = () => {
    const [authState, setAuthState] = useState("login"); // "login", "signup", "forgotPassword", "otpbVerification"

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
            default:
                return <Login />;
        }
    };

    return (
        <div className="flex min-h-screen bg-primary items-center justify-center">
            {/* Logo */}
            <div className="absolute top-4 left-4">
                        <img
                            src="/path/to/logo.png"
                            alt="Logo"
                            className="h-10"
                        />
                    </div>
            <div className="relative w-[70%] flex items-center justify-center bg-primary-light rounded-2xl h-[650px]">
                {/* Left Section */}
                <div
                    className={`w-full md:w-1/2 flex-1 flex flex-col justify-center items-center p-8 ${authState === "signup" ? "order-2 translate-x-10" : "order-1  translate-x-0"} transition-all duration-300 ease-in`}
                >

                    {/* Auth Form */}
                    <div className="bg-primary-light shadow-md rounded-xl p-6 w-full max-w-md border-[1px] border-solid border-black">
                        <h2 className="text-2xl font-bold text-center mb-4">
                            {authState === "login" && "Log In"}
                            {authState === "signup" && "Sign Up"}
                            {authState === "forgotPassword" && "Forgot Password"}
                            {authState === "otpVerification" && "OTP Verification"}
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
                            {authState === ""}
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


