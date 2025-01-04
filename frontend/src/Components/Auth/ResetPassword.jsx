import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate(); // For navigation
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API}/auth/updatepassword`,
                { newPassword },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setSuccess(true);
            setTimeout(() => {
                navigate("/login"); // Redirect to login page
            }, 1000); // Redirect after 2 seconds to allow message display
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.resetPage}>
            <form style={styles.resetForm} onSubmit={handleResetPassword}>
                <div style={styles.formGroup}>
                    <label htmlFor="new-password" style={styles.formLabel}>
                        New Password
                    </label>
                    <input
                        type="password"
                        id="new-password"
                        style={styles.formInput}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>

                <div style={styles.formGroup}>
                    <label htmlFor="confirm-password" style={styles.formLabel}>
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirm-password"
                        style={styles.formInput}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    style={styles.resetButton}
                    disabled={loading}
                >
                    {loading ? "Resetting..." : "Reset Password"}
                </button>
                <div style={styles.messageContainer}>
                    {error && <p style={styles.errorMessage}>{error}</p>}
                    {success && <p style={styles.successMessage}>Password reset successfully! Redirecting to login...</p>}
                </div>
            </form>
        </div>
    );
}

const styles = {
    resetPage: {
        minHeight: "10vh",
        display: "flex",
        justifyContent: "center",
        padding: "0.25rem",
        fontFamily: "Arial, sans-serif",
        fontSize: "14px",
        flexWrap: "wrap",
        borderRadius: "8px",
        width: "100%",
        maxWidth: "1000px",
        overflow: "hidden",
        flexDirection: "column",
    },
    resetForm: {
        display: "flex",
        flexDirection: "column",
    },
    formGroup: {
        marginBottom: "1rem",
    },
    formLabel: {
        display: "block",
        fontSize: "14px",
        color: "#444444",
        marginBottom: "0.5rem",
    },
    formInput: {
        width: "100%",
        padding: "0.5rem",
        border: "1px solid #4a3e36",
        borderRadius: "6px",
        fontSize: "14px",
        boxSizing: "border-box",
    },
    resetButton: {
        padding: "0.5rem",
        backgroundColor: "#B38d72",
        fontSize: "16px",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        textAlign: "center",
        marginTop: "1rem",
        width: "150px",
        margin: "0 auto",
    },
    messageContainer: {
        marginTop: "1rem",
        textAlign: "center",
    },
    errorMessage: {
        color: "red",
        fontSize: "14px",
    },
    successMessage: {
        color: "green",
        fontSize: "14px",
    },
};
