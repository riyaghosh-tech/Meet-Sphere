import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from './config';
import './Dashboard.css';

function Dashboard() {
  const [createdEvents, setCreatedEvents] = useState([]);
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const [createdRes, joinedRes] = await Promise.all([
          fetch(`${API_BASE}/api/events/me`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_BASE}/api/events/joined`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        ]);

        if (!createdRes.ok || !joinedRes.ok) {
          throw new Error('Failed to fetch dashboard data');
        }

        const createdData = await createdRes.json();
        const joinedData = await joinedRes.json();

        // Ensure we don't duplicate events if user created and joined the same event
        // (the backend `createEvent` adds creator to `participants`)
        const createdIds = new Set(createdData.map(e => e._id));
        const filteredJoined = joinedData.filter(e => !createdIds.has(e._id));

        setCreatedEvents(createdData);
        setJoinedEvents(filteredJoined);
      } catch (err) {
        console.error(err);
        setError('Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const renderCard = (event) => (
    <article className="event-card" key={event._id}>
      <h3 className="event-title">{event.title}</h3>
      <p className="event-meta">
        <span className="meta-label">Date:</span> {new Date(event.date).toLocaleDateString()}
      </p>
      <p className="event-meta">
        <span className="meta-label">Location:</span> {event.location}
      </p>
      <p className="event-meta">
        <span className="meta-label">Category:</span> {event.category}
      </p>
    </article>
  );

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-content" style={{textAlign: 'center', marginTop: '2rem'}}>
          Loading dashboard...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-content" style={{textAlign: 'center', marginTop: '2rem', color: 'red'}}>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <main className="dashboard-content">
        <section className="dashboard-section">
          <h2 className="section-title">My Created Events</h2>
          {createdEvents.length > 0 ? (
            <div className="events-grid">{createdEvents.map(renderCard)}</div>
          ) : (
            <p>You haven't created any events yet.</p>
          )}
        </section>

        <section className="dashboard-section">
          <h2 className="section-title">Joined Events</h2>
          {joinedEvents.length > 0 ? (
            <div className="events-grid">{joinedEvents.map(renderCard)}</div>
          ) : (
            <p>You haven't joined any events yet.</p>
          )}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
