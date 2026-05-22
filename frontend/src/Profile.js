import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

function Profile({ currentUser }) {
  const navigate = useNavigate();

  if (!currentUser) {
    return (
      <section className="profile-page">
        <div className="profile-card">
          <h2 className="profile-name" style={{ marginBottom: '20px' }}>Not Logged In</h2>
          <p className="profile-email">Please log in to view your profile.</p>
          <button 
            className="btn-primary mt-4" 
            onClick={() => navigate('/login')}
          >
            Go to Login
          </button>
        </div>
      </section>
    );
  }

  // Determine role display name and badge class
  const rawRole = String(currentUser.role || 'participant').toLowerCase();
  let roleDisplayName = "Participant";
  let badgeClass = "role-participant";

  if (rawRole === 'core' || rawRole === 'admin') {
    roleDisplayName = "Core Member (Admin)";
    badgeClass = "role-admin";
  } else if (rawRole === 'volunteer') {
    roleDisplayName = "Volunteer";
    badgeClass = "role-volunteer";
  }

  // Get initials for avatar
  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.split(' ');
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <section className="profile-page">
      <div className="profile-card">
        <div className="profile-avatar-large">
          {getInitials(currentUser.name)}
        </div>
        
        <h2 className="profile-name">{currentUser.name || "User"}</h2>
        <p className="profile-email">{currentUser.email || "No email provided"}</p>
        
        <div className={`profile-role-badge ${badgeClass}`}>
          {roleDisplayName}
        </div>

        <div style={{ marginTop: '20px' }}>
          <button 
            className="btn-secondary" 
            style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: 'white', fontWeight: 'bold' }}
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location.href = '/login';
            }}
          >
            Sign Out
          </button>
        </div>
      </div>
    </section>
  );
}

export default Profile;
