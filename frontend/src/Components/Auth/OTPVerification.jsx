import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OTPVerification = ({ email }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const navigate = useNavigate();

  // Handle OTP input change
  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Automatically focus on the next input
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  // Handle backspace to move focus to the previous input
  const handleBackspace = (event, index) => {
    if (event.key === "Backspace" && index > 0 && otp[index] === "") {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  // Submit OTP
  const submitOtp = async () => {
    const finalOtp = otp.join("");
    if (finalOtp.length === otp.length) {
      try {
        setLoading(true);
        setError(""); // Reset error before submitting
        const response = await axios.post(
          `${process.env.REACT_APP_API}/auth/verifyotp`,
          { otp: finalOtp },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        navigate("/");
        // Handle success logic here (e.g., navigate or show success message)
      } catch (err) {
        console.error(err);
        setError(err.response.data.message);
      } finally {
        setLoading(false);
      }
    } else {
      setError("Please enter all OTP digits!");
    }
  };

  // Resend OTP
  const resendOtp = async () => {
    try {
      setResendLoading(true);
      setError(""); // Reset error before resending
      // Call the API to resend the OTP
      const response = await axios.post(
        `${process.env.REACT_APP_API}/auth/resendotp`,{},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("OTP resend success", response.data);
      // Reset OTP inputs
      setOtp(["", "", "", "", "", ""]);
      alert("OTP has been resent. Please check your email.");
    } catch (err) {
      console.error(err);
      setError(err.response.data.message);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="otp-container">
      <h2 className="text-xl font-bold mb-4">Enter OTP</h2>

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="otp-inputs flex justify-center space-x-4 mb-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleBackspace(e, index)}
            className="w-12 h-12 text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg"
          />
        ))}
      </div>

      {/* Submit OTP Button */}
      <button
        onClick={submitOtp}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300"
        disabled={loading}
      >
        {loading ? "Verifying..." : "Submit OTP"}
      </button>
      <div className="mt-4 text-xs">
        <p>
          Didn't receive OTP?{' '}
          <a
            href="#"
            onClick={resendOtp}
            style={{ color: 'blue', textDecoration: 'underline' }}
          >
            Resend
          </a>
        </p>
      </div>
    </div>
  );
};

export default OTPVerification;
