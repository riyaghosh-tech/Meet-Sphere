import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EventDetails.css';

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [joinStatus, setJoinStatus] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/events/${id}`);
        if (!res.ok) throw new Error('Failed to fetch event details');
        const data = await res.json();
        setEvent(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load event details.');
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleJoin = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      setJoinStatus('Joining...');
      const res = await fetch(`http://localhost:5000/api/events/join/${id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Failed to join event');
      }
      
      setJoinStatus('Joined Successfully!');
      
      // Refresh event details to update participants list
      const updatedRes = await fetch(`http://localhost:5000/api/events/${id}`);
      if (updatedRes.ok) {
        setEvent(await updatedRes.json());
      }
    } catch (err) {
      console.error(err);
      setJoinStatus(err.message);
    }
  };

  if (loading) {
    return <main className="event-details-page"><p style={{textAlign: 'center', marginTop: '2rem'}}>Loading event details...</p></main>;
  }

  if (error || !event) {
    return <main className="event-details-page"><p style={{textAlign: 'center', marginTop: '2rem', color: 'red'}}>{error || 'Event not found'}</p></main>;
  }

  return (
    <main className="event-details-page">
      <section className="event-details-card">
        <header className="event-header">
          <h1 className="event-title">{event.title}</h1>
          <span className="event-category">{event.category}</span>
        </header>

        <section className="event-section">
          <h2 className="section-heading">Description</h2>
          <p className="section-text">{event.description}</p>
        </section>

        <section className="event-section event-highlight-grid">
          <div className="highlight-box">
            <p className="highlight-label">Date</p>
            <p className="highlight-value">{new Date(event.date).toLocaleDateString()}</p>
          </div>
          <div className="highlight-box">
            <p className="highlight-label">Location</p>
            <p className="highlight-value">{event.location}</p>
          </div>
        </section>

        <div style={{ textAlign: 'center', margin: '2rem 0' }}>
          <button className="join-button" type="button" onClick={handleJoin}>
            Join Event
          </button>
          {joinStatus && <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>{joinStatus}</p>}
        </div>

        <section className="event-section participants-section">
          <h2 className="section-heading">Participants ({event.participants?.length || 0})</h2>
          {event.participants && event.participants.length > 0 ? (
            <ul className="participants-list">
              {event.participants.map((participant) => (
                <li className="participant-item" key={participant._id}>
                  {participant.name}
                </li>
              ))}
            </ul>
          ) : (
            <p>No participants yet. Be the first to join!</p>
          )}
        </section>
      </section>
    </main>
  );
}

export default EventDetails;
