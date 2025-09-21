import { useState } from "react";
import api from "../api";
import "./Auth.css";

export default function Register() {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { username, email, password });
      alert("Registration successful! Please login.");
      window.location.href = "/login";
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        {step === 1 && (
          <>
            <input
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <button type="button" onClick={() => setStep(2)}>Next →</button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="button" onClick={() => setStep(3)}>Next →</button>
            <button type="button" onClick={() => setStep(1)}>← Back</button>
          </>
        )}

        {step === 3 && (
          <>
            <input
              type="password"
              placeholder="Choose a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Register</button>
            <button type="button" onClick={() => setStep(2)}>← Back</button>
          </>
        )}
      </form>

      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}

