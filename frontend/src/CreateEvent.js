import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CreateEvent.css';

const API_BASE = process.env.REACT_APP_API_BASE ?? "";

function getStoredToken() {
  const t = localStorage.getItem("token");
  if (!t || t === "null" || t === "undefined") return null;
  return t;
}

function CreateEvent({ currentUser }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: '',
  });
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [createMessage, setCreateMessage] = useState(null);

  const isCore = String(currentUser?.role || '').toLowerCase() === 'core';

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setCreateMessage(null);
    setLoadingCreate(true);

    const token = getStoredToken();
    if (!token) {
      setCreateMessage({ type: "error", text: "You must log in to create an event." });
      setLoadingCreate(false);
      setTimeout(() => navigate("/login"), 1500);
      return;
    }

    try {
      const dateTimeString = formData.date + (formData.time ? `T${formData.time}:00` : "T00:00:00");
      
      const payload = {
        title: formData.title,
        description: formData.description,
        date: dateTimeString,
        location: formData.location,
        category: formData.category,
      };

      await axios.post(`${API_BASE}/api/events/create`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setCreateMessage({ type: "success", text: "Event created successfully!" });
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Error creating event.";
      setCreateMessage({ type: "error", text: msg });
    } finally {
      setLoadingCreate(false);
    }
  };

  if (!currentUser) {
    return (
      <section className="create-event-page">
        <div className="create-event-card" style={{ textAlign: 'center' }}>
          <h2 className="create-event-title">Access <span className="highlight-text">Denied</span></h2>
          <p style={{ color: '#e2e8f0', fontSize: '1.1rem' }}>Please log in to use this feature.</p>
        </div>
      </section>
    );
  }

  if (!isCore) {
    return (
      <section className="create-event-page">
        <div className="create-event-card" style={{ textAlign: 'center' }}>
          <h2 className="create-event-title">Access <span className="highlight-text">Restricted</span></h2>
          <p style={{ color: '#e2e8f0', fontSize: '1.1rem' }}>
            Only Core Members (Admins) can create events.
          </p>
          <p style={{ color: '#94a3b8', marginTop: '10px' }}>
            If you need to host an event, please contact an administrator.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="create-event-page">
      <div className="create-event-card">
        <h2 className="create-event-title">Create <span className="highlight-text">Event</span></h2>
        
        <form className="create-event-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title" className="field-label">Title</label>
            <div className="input-wrapper">
              <span className="input-icon">📝</span>
              <input
                id="title"
                name="title"
                className="field-input"
                placeholder="Event Title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        
          <div className="inline-fields">
            <div className="form-group">
              <label htmlFor="date" className="field-label">Date</label>
              <div className="input-wrapper">
                <span className="input-icon">📅</span>
                <input
                  id="date"
                  name="date"
                  type="date"
                  className="field-input"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="time" className="field-label">Time</label>
              <div className="input-wrapper">
                <span className="input-icon">⏰</span>
                <input
                  id="time"
                  name="time"
                  type="time"
                  className="field-input"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="location" className="field-label">Location</label>
            <div className="input-wrapper location-wrapper">
              <span className="input-icon">📍</span>
              <input
                id="location"
                name="location"
                className="field-input"
                placeholder="Where is it happening?"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        
        {formData.location && formData.location.trim().length > 2 && (
          <div className="mt-2 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm" style={{ height: '200px', width: '100%', marginBottom: '12px' }}>
            <iframe
              title="Event Location Map"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src={`https://www.google.com/maps?q=${encodeURIComponent(formData.location.trim())}&output=embed`}
            ></iframe>
          </div>
        )}

          <div className="form-group">
            <label htmlFor="category" className="field-label">Category</label>
            <div className="input-wrapper">
              <span className="input-icon">🏷️</span>
              <input
                id="category"
                name="category"
                className="field-input"
                placeholder="e.g. Technology, Music, Art"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description" className="field-label">Description</label>
            <div className="input-wrapper textarea-wrapper">
              <span className="input-icon textarea-icon">📄</span>
              <textarea
                id="description"
                name="description"
                className="field-input field-textarea"
                placeholder="Tell us more about the event..."
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={loadingCreate}>
            {loadingCreate ? (
              <div style={{display:'flex', alignItems:'center', justifyContent:'center', gap:'8px'}}>
                <div className="spinner" style={{width:'16px', height:'16px'}}></div>
                Creating...
              </div>
            ) : "Create Event"}
          </button>

          {createMessage && (
            <div className={`alert-${createMessage.type}`} style={{marginTop:'10px'}}>
              {createMessage.text}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

export default CreateEvent;

