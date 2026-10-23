
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../services/api";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadPosts() {
    try {
      setLoading(true);
      setError("");

      const response = await apiClient.get("/posts");
      setPosts(response.data);
    } catch (err) {
      setError("Posts load nahi hui. Please dobara try karo.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <main className="directory-page">
      <nav className="navbar">
        <Link to="/" className="logo">
          DevDirectory
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/users">Developers</Link>
          <Link to="/posts">Posts</Link>
          <Link to="/add-post">Add Post</Link>
        </div>
      </nav>

      <section className="directory-content">
        <p className="section-label">COMMUNITY KNOWLEDGE</p>

        <h1>Developer Posts</h1>

        <p className="directory-subtitle">
          Explore ideas and updates from our developer community.
        </p>

        {loading && <p>Loading posts...</p>}

        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={loadPosts}>Retry</button>
          </div>
        )}

        {!loading && !error && (
          <div className="user-grid">
            {posts.map((post) => (
              <article className="user-card" key={post.id}>
                <p className="section-label">
                  DEVELOPER POST #{post.id}
                </p>

                <h2>{post.title}</h2>

                <p className="user-company">{post.body}</p>

                <p>Author ID: {post.userId}</p>

                <Link to={`/users/${post.userId}`}>
                  View Developer →
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
