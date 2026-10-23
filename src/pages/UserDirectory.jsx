
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers } from "../services/postService";
import UserCard from "../components/Usercard";

export default function UserDirectory() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadUsers() {
    setLoading(true);
    setError("");

    try {
      const data = await getUsers();
      setUsers(data);
    } catch {
      setError("Developers load nahi ho paaye.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const query = search.toLowerCase();

    return (
      user.name.toLowerCase().includes(query) ||
      user.company.name.toLowerCase().includes(query)
    );
  });

  return (
    <main className="directory-page">
      <nav className="navbar">
        <Link to="/" className="logo">DevDirectory</Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/users">Developers</Link>
          <Link to="/login">Login</Link>
        </div>
      </nav>

      <section className="directory-content">
        <p className="section-label">OUR COMMUNITY</p>
        <h1>Meet the Developers</h1>
        <p className="directory-subtitle">
          Discover talented people and explore their work.
        </p>

        <input
          className="search-input"
          type="search"
          placeholder="Search by name or company..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        {loading && <p>Loading developers...</p>}

        {error && (
          <div className="error-message">
            {error}
            <button onClick={loadUsers}>Retry</button>
          </div>
        )}

        {!loading && !error && (
          <>
            <p className="results-count">
              {filteredUsers.length} developers found
            </p>

            <div className="user-grid">
              {filteredUsers.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>

            {filteredUsers.length === 0 && (
              <p>No developers found. Try another search.</p>
            )}
          </>
        )}
      </section>
    </main>
  );
}
