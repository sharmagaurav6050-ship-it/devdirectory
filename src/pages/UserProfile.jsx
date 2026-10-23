
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getUserById,
  getPostsByUserId,
} from "../services/postService";

export default function UserProfile() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadProfile() {
    setLoading(true);
    setError("");

    try {
      const [userData, postData] = await Promise.all([
        getUserById(id),
        getPostsByUserId(id),
      ]);

      setUser(userData);
      setPosts(postData);
    } catch {
      setError("Profile load nahi ho paayi. Dobara try karo.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProfile();
  }, [id]);

  if (loading) {
    return <main className="simple-page">Loading profile...</main>;
  }

  if (error || !user) {
    return (
      <main className="simple-page">
        <h1>Profile unavailable</h1>
        <p>{error || "Developer nahi mila."}</p>
        <button onClick={loadProfile}>Retry</button>
        <p><Link to="/users">← Back to Developers</Link></p>
      </main>
    );
  }

  return (
    <main className="directory-content">
      <Link to="/users">← Back to Developers</Link>

      <section className="user-card">
        <div className="avatar">
          {user.name.charAt(0).toUpperCase()}
        </div>

        <h1>{user.name}</h1>
        <p>{user.company.name}</p>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Website: {user.website}</p>
        <p>City: {user.address.city}</p>

        <h2>Developer Posts</h2>

        {posts.length === 0 ? (
          <p>No posts available.</p>
        ) : (
          posts.map((post) => (
            <article key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </article>
          ))
        )}
      </section>
    </main>
  );
}
