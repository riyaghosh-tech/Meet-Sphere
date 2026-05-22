import { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './EventList.css';

function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTitle, setSearchTitle] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/events');
        if (!res.ok) throw new Error('Failed to fetch events');
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load events.');
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const categories = useMemo(
    () => ['All', ...new Set(events.map((event) => event.category))],
    [events]
  );

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
      const matchesTitle = event.title.toLowerCase().includes(searchTitle.toLowerCase());
      const matchesLocation = event.location.toLowerCase().includes(searchLocation.toLowerCase());
      return matchesCategory && matchesTitle && matchesLocation;
    });
  }, [events, selectedCategory, searchTitle, searchLocation]);

  const handleJoinEvent = async (e, eventId) => {
    e.stopPropagation(); // Prevent card click
    
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/events/join/${eventId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      
      if (!res.ok) {
        alert(data.message || 'Failed to join event');
        return;
      }
      
      // Navigate to dashboard upon successful join
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Error joining event.');
    }
  };

  if (loading) {
    return <main className="event-list-page"><p style={{textAlign: 'center', marginTop: '2rem'}}>Loading events...</p></main>;
  }

  if (error) {
    return <main className="event-list-page"><p style={{textAlign: 'center', marginTop: '2rem', color: 'red'}}>{error}</p></main>;
  }

  return (
    <main className="event-list-page">
      <section className="event-list-wrapper">
        <div className="event-list-header">
          <h1 className="event-list-title">Explore Events</h1>
          <p className="event-list-subtitle">
            Explore local events and join what interests you
          </p>
        </div>

        <div className="filter-row">
          <input
            type="text"
            className="filter-input"
            placeholder="Search by title..."
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />
          <input
            type="text"
            className="filter-input"
            placeholder="Filter by location..."
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
          />
          <select
            id="category"
            className="filter-select"
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="no-events-message">
            <p>No events found matching your criteria.</p>
          </div>
        ) : (
          <div className="event-grid">
            {filteredEvents.map((event) => (
              <article 
                className="event-card" 
                key={event._id} 
                onClick={() => navigate(`/event/${event._id}`)}
                style={{ cursor: 'pointer' }}
              >
                {/* Fallback image if event has no image */}
                <img 
                  src={event.image || 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=400&h=200&fit=crop'} 
                  alt={event.title} 
                  className="event-image" 
                />
                <div className="event-content">
                  <h2 className="event-title">{event.title}</h2>
                  <p className="event-info">
                    <span className="info-label">Date:</span> {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p className="event-info">
                    <span className="info-label">Location:</span> {event.location}
                  </p>
                  <p className="event-info">
                    <span className="info-label">Category:</span> {event.category}
                  </p>
                  <button 
                    className="join-button" 
                    onClick={(e) => handleJoinEvent(e, event._id)}
                    style={{ border: 'none', width: '100%' }}
                  >
                    Join
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default EventList;
