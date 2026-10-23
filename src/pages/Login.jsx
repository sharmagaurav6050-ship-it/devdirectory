
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const redirectTo = location.state?.from?.pathname || "/add-post";

  function handleSubmit(event) {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    login({ email: email.trim() });
    navigate(redirectTo, { replace: true });
  }

  
return (
  <main className="login-page">
    <div className="login-card">
      <h1>Welcome Back</h1>

      <p className="login-subtitle">
        Login to publish developer updates.
      </p>

      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your demo password"
            required
          />
        </label>

        {error && <p className="login-error">{error}</p>}

        <button className="login-button" type="submit">
          Login
        </button>
      </form>

      <Link to="/" className="login-back">
        ← Back to Home
      </Link>
    </div>
  </main>
);

}
