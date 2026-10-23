
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

import UserDirectory from "./pages/UserDirectory";
import UserProfile from "./pages/UserProfile";
import Login from "./pages/Login";
import AddPost from "./pages/AddPost";
import Posts from "./pages/Post";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

function Home() {
  const { isAuthenticated, logout } = useAuth();
  return (
    <div className="app">
      <nav className="navbar">
        <Link to="/" className="logo">
          DevDirectory
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/users">Developers</Link>
          <Link to="/posts">Posts</Link>
          <Link to="/add-post">Add Post</Link>
          {isAuthenticated ? (
  <button onClick={logout}>Logout</button>
) : (
  <Link to="/login">Login</Link>
)}
        </div>
      </nav>

      <main className="hero">
        <div className="hero-badge">
          ● Developer Community Portal
        </div>

        <h1>
          Discover brilliant minds.
          <br />
          <span>Build great things.</span>
        </h1>

        <p>
          Meet talented developers, explore their work,
          and share knowledge with your team.
        </p>

        <div className="hero-actions">
          <Link to="/users" className="btn-primary">
            Explore Developers →
          </Link>

          <Link to="/add-post" className="btn-secondary">
            Publish an Update
          </Link>
        </div>

        <div className="stats">
          <div>
            <h2>10+</h2>
            <p>Developers</p>
          </div>

          <div>
            <h2>100+</h2>
            <p>Projects & Posts</p>
          </div>

          <div>
            <h2>24/7</h2>
            <p>Knowledge Sharing</p>
          </div>
        </div>
      </main>
    </div>
  );
}

function NotFound() {
  return (
    <main className="simple-page">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">← Back to Home</Link>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/users"
          element={<UserDirectory />}
        />

        <Route
          path="/users/:id"
          element={<UserProfile />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/posts"
          element={<Posts />}
        />

        <Route element={<ProtectedRoute />}>
          <Route
            path="/add-post"
            element={<AddPost />}
          />
        </Route>

        <Route path="*" element={<Posts />} />
      </Routes>
    </BrowserRouter>
  );
}
