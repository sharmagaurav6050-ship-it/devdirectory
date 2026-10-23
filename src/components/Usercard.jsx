
import { Link } from "react-router-dom";

export default function UserCard({ user }) {
  return (
    <article className="user-card">
      <div className="avatar">
        {user.name.charAt(0).toUpperCase()}
      </div>

      <h2>{user.name}</h2>
      <p className="user-company">{user.company.name}</p>

      <div className="user-info">
        <p>✉️ {user.email}</p>
        <p>🌐 {user.website}</p>
        <p>📍 {user.address.city}</p>
      </div>

      <Link to={`/users/${user.id}`} className="profile-btn">
        View Profile →
      </Link>
    </article>
  );
}
