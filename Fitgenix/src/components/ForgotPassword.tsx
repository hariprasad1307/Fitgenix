import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Reset link sent! Check your email.");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="form-section">
      <form className="form" onSubmit={handleReset}>
        <h2>Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Send Reset Link</button>
        {message && <p style={{ color: "white" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <p className="link" onClick={() => navigate("/")}>Back to Login</p>
      </form>
    </div>
  );
};

export default ForgotPassword;
