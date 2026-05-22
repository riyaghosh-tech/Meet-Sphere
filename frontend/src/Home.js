import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import './Home.css';

function Home({ currentUser, events = [] }) {
  const navigate = useNavigate();
  const [showExploreModal, setShowExploreModal] = useState(false);
  const firstName = currentUser?.name ? currentUser.name.split(' ')[0] : 'User';

  const upcomingEvent = events.length > 0 ? events[0] : null;

  return (
    <div className="home-dashboard-wrapper">
      <div className="home-hero">
        <p className="hero-eyebrow">MEETSPHERE</p>
        <h1 className="hero-heading">Welcome back, <span className="highlight-text">{firstName}!</span> 👋</h1>
        <p className="hero-description">
          MeetSphere is a smart platform that connects people through events, hackathons, 
          and collaborations. Discover opportunities, build teams, and bring your ideas to life — all in one place.
        </p>
        <div className="hero-buttons">
          <button className="btn-glow-primary" onClick={() => navigate('/create')}>
            <span className="icon">+</span> Create Event
          </button>
          <button className="btn-glow-secondary" onClick={() => navigate('/dashboard')}>
            <span className="icon">📊</span> View Dashboard
          </button>
        </div>
      </div>

      <div className="home-main-cards">
        <div className="futuristic-card feature-card">
          <div className="card-icon-wrapper create-icon">
            <span className="icon">🗓️</span>
          </div>
          <div className="card-content">
            <h3>Create Events</h3>
            <p>Easily organize hackathons, meetups, and community events.</p>
            <button className="text-btn" onClick={() => navigate('/create')}>Get Started →</button>
          </div>
          <button className="card-arrow-btn" onClick={() => navigate('/create')}>›</button>
        </div>

        <div className="futuristic-card feature-card">
          <div className="card-icon-wrapper dashboard-icon">
            <span className="icon">📈</span>
          </div>
          <div className="card-content">
            <h3>Dashboard</h3>
            <p>Manage events, track participants, and stay updated.</p>
            <button className="text-btn" onClick={() => navigate('/dashboard')}>Open Dashboard →</button>
          </div>
          <button className="card-arrow-btn" onClick={() => navigate('/dashboard')}>›</button>
        </div>
      </div>

      <div className="home-bottom-row">
        <div className="futuristic-card upcoming-card">
          <div className="card-header">
            <h3><span className="icon">📅</span> Upcoming Events</h3>
            <button className="text-btn-subtle" onClick={() => navigate('/home')}>View All →</button>
          </div>
          
          {upcomingEvent ? (
            <div className="upcoming-event-item">
              <div className="event-img-placeholder">
                <span className="hologram-icon">💠</span>
              </div>
              <div className="event-details">
                <h4>{upcomingEvent.title} <span className="badge-upcoming">Upcoming</span></h4>
                <p className="event-desc">{upcomingEvent.description || 'Join this exciting event to build innovative solutions.'}</p>
                <div className="event-meta">
                  <span><span className="icon">🗓️</span> {new Date(upcomingEvent.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                  <span><span className="icon">🕘</span> 10:00 AM</span>
                  <span><span className="icon">📍</span> {upcomingEvent.location}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="upcoming-event-item">
              <div className="event-img-placeholder">
                <span className="hologram-icon">💠</span>
              </div>
              <div className="event-details">
                <h4>Hack the Future 2.0 <span className="badge-upcoming">Upcoming</span></h4>
                <p className="event-desc">A 24-hour hackathon to build innovative solutions.</p>
                <div className="event-meta">
                  <span><span className="icon">🗓️</span> 25 May 2025</span>
                  <span><span className="icon">🕘</span> 10:00 AM</span>
                  <span><span className="icon">📍</span> Online</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="futuristic-card quick-actions-card">
          <div className="card-header">
            <h3><span className="icon">⚡</span> Quick Actions</h3>
          </div>
          <ul className="quick-actions-list">
            <li onClick={() => navigate('/create')}>
              <div className="action-icon action-create"><span className="icon">+</span></div>
              <span>Create Event</span>
              <span className="arrow">›</span>
            </li>
            <li onClick={() => navigate('/chatbox')}>
              <div className="action-icon action-group"><span className="icon">👥</span></div>
              <span>Join a Group</span>
              <span className="arrow">›</span>
            </li>
            <li onClick={() => setShowExploreModal(true)}>
              <div className="action-icon action-explore"><span className="icon">📅</span></div>
              <span>Explore Events</span>
              <span className="arrow">›</span>
            </li>
          </ul>
        </div>
      </div>
      <Footer />

      {/* Explore Events Modal */}
      {showExploreModal && (
        <div className="explore-modal-overlay" onClick={() => setShowExploreModal(false)}>
          <div className="explore-modal-content" onClick={e => e.stopPropagation()}>
            <div className="explore-modal-header">
              <h2>All Events</h2>
              <button className="explore-close-btn" onClick={() => setShowExploreModal(false)}>&times;</button>
            </div>
            <div className="explore-modal-body">
              {events.length === 0 ? (
                <p style={{color: '#94a3b8', textAlign: 'center'}}>No events available right now.</p>
              ) : (
                events.map(ev => (
                  <div key={ev._id || ev.id} className="explore-event-card">
                    <h4>{ev.title}</h4>
                    <p className="explore-event-meta">
                      <span><span className="icon">📍</span> {ev.location || 'Online'}</span> 
                      <span><span className="icon">🗓️</span> {new Date(ev.date).toLocaleDateString()}</span>
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
