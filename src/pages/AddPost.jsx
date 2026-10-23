
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers, createPost } from "../services/postService";

export default function AddPost() {
  const [users, setUsers] = useState([]);
  const [authorId, setAuthorId] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [usersLoading, setUsersLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch {
        setError("Users load nahi hue. Please dobara try karo.");
      } finally {
        setUsersLoading(false);
      }
    }

    loadUsers();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!authorId || !title.trim() || !body.trim()) {
      setError("Please saari fields fill karo.");
      return;
    }

    try {
      setLoading(true);

      await createPost({
        userId: Number(authorId),
        title: title.trim(),
        body: body.trim(),
      });

      setSuccess(
        "Post successfully submit ho gayi! (Demo API par permanently save nahi hogi.)"
      );

      setAuthorId("");
      setTitle("");
      setBody("");
    } catch {
      setError("Post submit nahi hui. Please dobara try karo.");
    } finally {
      setLoading(false);
    }
  }

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
        <p className="section-label">SHARE YOUR KNOWLEDGE</p>
        <h1>Add a Developer Post</h1>

        <p className="directory-subtitle">
          Share your ideas and updates with the developer community.
        </p>

        <form
          onSubmit={handleSubmit}
          className="user-card add-post-form"
        >
          <label htmlFor="author">Select Author</label>
          <select
            id="author"
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value)}
            required
            disabled={usersLoading || loading}
          >
            <option value="">
              {usersLoading ? "Loading users..." : "Choose a developer"}
            </option>

            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          <label htmlFor="post-title">Post Title</label>
          <input
            id="post-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your post title"
            required
            disabled={loading}
          />

          <label htmlFor="post-body">Post Description</label>
          <textarea
            id="post-body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write something for the developer community..."
            rows={6}
            required
            disabled={loading}
          />

          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          <button
            type="submit"
            className="login-button"
            disabled={loading || usersLoading}
          >
            {loading ? "Submitting..." : "Submit Post"}
          </button>
        </form>
      </section>
    </main>
  );
}
