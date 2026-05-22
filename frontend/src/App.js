import { useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Home from "./Home";
import Landing from "./Landing";
import Login from "./Login";
import EventPrep from "./EventPrep";
import Groups from "./Groups";
import Profile from "./Profile";
import CreateEvent from "./CreateEvent";
import { getErrorMessage } from "./apiErrors";
import { API_BASE } from "./config";

const PATH_TO_PAGE = {
  "/": "landing",
  "/home": "home",
  "/login": "login",
  "/create": "create",
  "/dashboard": "dashboard",
  "/event-prep": "eventPrep",
  "/chatbox": "chatbox",
  "/profile": "profile",
};

function toDateInputValue(val) {
  if (!val) return "";
  const d = new Date(val);
  return Number.isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 10);
}

function formatEventDate(val) {
  if (!val) return "—";
  const d = new Date(val);
  return Number.isNaN(d.getTime())
    ? String(val)
    : d.toLocaleDateString(undefined, { dateStyle: "medium" });
}

function getStoredToken() {
  const t = localStorage.getItem("token");
  if (!t || t === "null" || t === "undefined") return null;
  return t;
}

function normalizePathname(pathname) {
  if (!pathname) return "/";
  const trimmed = pathname.replace(/\/+$/, "") || "/";
  return trimmed;
}

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(() => {
    const path = normalizePathname(window.location.pathname);
    return PATH_TO_PAGE[path] || "landing";
  });

  useEffect(() => {
    const path = location.pathname;
    if (path.length > 1 && path.endsWith("/")) {
      navigate(
        `${normalizePathname(path)}${location.search}${location.hash}`,
        { replace: true }
      );
      return;
    }
    const key = normalizePathname(location.pathname);
    const page = PATH_TO_PAGE[key];
    if (page) setCurrentPage(page);
    else setCurrentPage("landing");
  }, [location.pathname, location.search, location.hash, navigate]);

  useEffect(() => {
    const token = getStoredToken();
    if (!token || localStorage.getItem("user")) return;
    let cancelled = false;
    axios
      .get(`${API_BASE}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (cancelled) return;
        localStorage.setItem("user", JSON.stringify(res.data));
        setCurrentUser(res.data);
      })
      .catch(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      });
    return () => {
      cancelled = true;
    };
  }, []);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [eventsError, setEventsError] = useState("");

  const [joinedEventIds, setJoinedEventIds] = useState([]);
  const [joinMessage, setJoinMessage] = useState(null);
  const [loadingJoinId, setLoadingJoinId] = useState(null);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [loginMessage, setLoginMessage] = useState(null);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  useEffect(() => {
    if (normalizePathname(location.pathname) === "/register") {
      navigate("/login?mode=register", { replace: true });
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    if (normalizePathname(location.pathname) !== "/login") return;
    const mode = searchParams.get("mode");
    if (mode === "register") setAuthMode("register");
    else setAuthMode("login");
  }, [location.pathname, searchParams]);

  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "volunteer",
  });
  const [registerMessage, setRegisterMessage] = useState(null);
  const [loadingRegister, setLoadingRegister] = useState(false);

  const [createForm, setCreateForm] = useState({
    title: "",
    date: "",
    location: "",
    category: "",
    description: "",
  });

  const [createMessage, setCreateMessage] = useState(null);
  const [loadingCreate, setLoadingCreate] = useState(false);

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const [dashboardExpandedId, setDashboardExpandedId] = useState(null);
  const [dashboardShowParticipantsId, setDashboardShowParticipantsId] = useState(null);
  const [dashboardShowVolunteersId, setDashboardShowVolunteersId] = useState(null);
  const [dashboardShowCoreId, setDashboardShowCoreId] = useState(null);
  const [dashboardEdit, setDashboardEdit] = useState(null);
  const [dashboardSaving, setDashboardSaving] = useState(false);
  const [dashboardMessage, setDashboardMessage] = useState(null);

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // ✅ Fetch events from backend
  useEffect(() => {
    axios
      .get(`${API_BASE}/api/events`)
      .then((res) => {
        setEvents(res.data);
        setLoadingEvents(false);
      })
      .catch((err) => {
        setEventsError(
          getErrorMessage(err, "Failed to load events. Check backend/MongoDB.")
        );
        setLoadingEvents(false);
      });
  }, []);

  // ✅ Join event
  const handleJoin = async (id) => {
    const token = getStoredToken();
    if (!token) {
      setJoinMessage({ type: "error", text: "You must log in to join an event." });
      setTimeout(() => setJoinMessage(null), 3500);
      return;
    }

    setJoinMessage(null);
    setLoadingJoinId(id);

    try {
      await axios.post(`${API_BASE}/api/events/join/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setJoinedEventIds((prev) => [...prev, id]);

      // Refresh events so the dashboard participant lists update instantly
      const evRes = await axios.get(`${API_BASE}/api/events`);
      setEvents(evRes.data);

      setJoinMessage({ type: "success", text: "Successfully joined the event!" });
    } catch (err) {
      setJoinMessage({ type: "error", text: getErrorMessage(err, "Failed to join event.") });
    } finally {
      setLoadingJoinId(null);
      setTimeout(() => setJoinMessage(null), 3500);
    }
  };

  // ✅ Fetch joined events to persist state
  useEffect(() => {
    if (!currentUser) {
      setJoinedEventIds([]);
      return;
    }
    const token = getStoredToken();
    if (!token) return;
    axios
      .get(`${API_BASE}/api/events/joined-events`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => setJoinedEventIds(res.data.map(e => e._id || e.id)))
      .catch((err) => console.log("Failed to fetch joined events", err));
  }, [currentUser]);

  // ✅ LOGIN HANDLER (REAL BACKEND)
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginMessage(null);
    setLoadingLogin(true);

    try {
      const res = await axios.post(
        `${API_BASE}/api/auth/login`,
        loginForm
      );

      localStorage.setItem("token", res.data.token);
      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setCurrentUser(res.data.user);
      }
      setLoginMessage({ type: "success", text: "Login Successful!" });

      setTimeout(() => {
        navigate("/home");
        setLoadingLogin(false);
      }, 800);
    } catch (err) {
      setLoginMessage({ type: "error", text: getErrorMessage(err, "Login failed") });
      setLoadingLogin(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setRegisterMessage(null);

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(registerForm.password)) {
      setRegisterMessage({
        type: "error",
        text: "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character."
      });
      return;
    }

    setLoadingRegister(true);

    try {
      await axios.post(
        `${API_BASE}/api/auth/register`,
        registerForm
      );

      setRegisterMessage({ type: "success", text: "Registration successful! Please login." });
      setRegisterForm({
        name: "",
        email: "",
        password: "",
        role: "volunteer",
      });
      setTimeout(() => {
        setAuthMode("login");
        setRegisterMessage(null);
        setLoadingRegister(false);
      }, 1500);
    } catch (err) {
      setRegisterMessage({ type: "error", text: getErrorMessage(err, "Registration failed") });
      setLoadingRegister(false);
    }
  };

  // ✅ CREATE EVENT
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setCreateMessage(null);
    setLoadingCreate(true);

    const token = getStoredToken();
    if (!token) {
      setCreateMessage({
        type: "error",
        text: "You must log in to create an event. Use Login, then try again.",
      });
      setLoadingCreate(false);
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        `${API_BASE}/api/events/create`,
        createForm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCreateMessage({ type: "success", text: "Event Created successfully!" });

      setCreateForm({
        title: "",
        date: "",
        location: "",
        category: "",
        description: "",
      });

      // refresh events
      const res = await axios.get(
        `${API_BASE}/api/events`
      );
      setEvents(res.data);
      navigate("/dashboard");
    } catch (err) {
      setCreateMessage({ type: "error", text: getErrorMessage(err, "Error creating event.") });
    } finally {
      setLoadingCreate(false);
    }
  };

  // ✅ UI COMPONENTS

  const renderEvents = () => {
    if (loadingEvents) return <div className="spinner"></div>;
    if (eventsError) return <div className="alert-error">{eventsError}</div>;

    return (
      <div className="event-grid">
        {joinMessage && (
          <div className={`alert-${joinMessage.type}`} style={{ gridColumn: "1 / -1" }}>
            {joinMessage.text}
          </div>
        )}
        {events.map((e) => (
          <div key={e._id || e.id} className="event-card">
            <h3>{e.title}</h3>
            <div className="card-badges">
              <span className={`badge badge-${e.category ? e.category.toLowerCase().replace(/\s+/g, '-') : 'other'}`}>
                {e.category || 'Other'}
              </span>
            </div>
            <p>
              <span>Date:</span> {e.date}
            </p>
            <p>
              <span>Location:</span> {e.location}
            </p>
            <button
              onClick={() => handleJoin(e._id || e.id)}
              disabled={loadingJoinId === (e._id || e.id) || joinedEventIds.includes(e._id || e.id)}
            >
              {loadingJoinId === (e._id || e.id)
                ? "Joining..."
                : joinedEventIds.includes(e._id || e.id)
                  ? "Joined"
                  : "Join"}
            </button>
          </div>
        ))}
      </div>
    );
  };

  const renderHome = () => (
    <section className="page-section home-page-container">
      <Home currentUser={currentUser} events={events} />
    </section>
  );

  const renderLogin = () => (
    <Login
      authMode={authMode}
      loginForm={loginForm}
      onLoginFormChange={setLoginForm}
      onLoginSubmit={handleLoginSubmit}
      loadingLogin={loadingLogin}
      loginMessage={loginMessage}
      registerForm={registerForm}
      onRegisterFormChange={setRegisterForm}
      onRegisterSubmit={handleRegisterSubmit}
      loadingRegister={loadingRegister}
      registerMessage={registerMessage}
      onSwitchToRegister={() => {
        setAuthMode("register");
        navigate("/login?mode=register", { replace: true });
      }}
      onSwitchToLogin={() => {
        setAuthMode("login");
        navigate("/login", { replace: true });
      }}
    />
  );

  const renderCreate = () => {
    if (!getStoredToken()) {
      return (
        <section className="page-section narrow">
          <h2 className="page-title">Create Event</h2>
          <div className="alert-error" style={{ marginBottom: "14px" }}>
            You must be logged in to create an event.{" "}
            <button
              type="button"
              className="link-button"
              onClick={() => navigate("/login")}
            >
              Go to Login
            </button>
          </div>
        </section>
      );
    }

    if (currentUser?.role !== "core") {
      return (
        <section className="page-section narrow">
          <h2 className="page-title">Create Event</h2>
          <div className="alert-error" style={{ marginBottom: "14px" }}>
            Access Denied. Only Core Team members can create new events.
          </div>
        </section>
      );
    }

    return (
      <section className="page-section narrow">
        <h2 className="page-title">Create Event</h2>
        <form className="form-card" onSubmit={handleCreateSubmit}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            placeholder="Title"
            value={createForm.title}
            onChange={(e) =>
              setCreateForm({ ...createForm, title: e.target.value })
            }
          />
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            value={createForm.date}
            onChange={(e) =>
              setCreateForm({ ...createForm, date: e.target.value })
            }
          />
          <label htmlFor="location">Location</label>
          <input
            id="location"
            placeholder="Location"
            value={createForm.location}
            onChange={(e) =>
              setCreateForm({
                ...createForm,
                location: e.target.value,
              })
            }
          />
          {createForm.location && createForm.location.trim().length > 2 && (
            <div className="mt-2 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm" style={{ height: '200px', width: '100%', marginBottom: '12px' }}>
              <iframe
                title="Event Location Map"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={`https://www.google.com/maps?q=${encodeURIComponent(createForm.location.trim())}&output=embed`}
              ></iframe>
            </div>
          )}
          <label htmlFor="category">Category</label>
          <input
            id="category"
            placeholder="Category"
            value={createForm.category}
            onChange={(e) =>
              setCreateForm({
                ...createForm,
                category: e.target.value,
              })
            }
          />
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Description"
            value={createForm.description}
            onChange={(e) =>
              setCreateForm({
                ...createForm,
                description: e.target.value,
              })
            }
          />
          <button type="submit" disabled={loadingCreate}>
            {loadingCreate ? "Creating..." : "Create"}
          </button>
          {createMessage && (
            <div className={`alert-${createMessage.type}`}>
              {createMessage.text}
            </div>
          )}
        </form>
      </section>
    );
  };

  const renderDashboard = () => {
    const currentUserId = currentUser?.id;

    const isOwner = (ev) => {
      const creatorId = ev.createdBy?._id ?? ev.createdBy;
      return Boolean(
        currentUserId &&
        creatorId &&
        String(currentUserId) === String(creatorId)
      );
    };

    const toggleExpand = (ev) => {
      const id = ev._id || ev.id;
      setDashboardExpandedId((prev) => (prev === id ? null : id));
      setDashboardEdit(null);
      setDashboardMessage(null);
      setDashboardShowParticipantsId(null);
      setDashboardShowVolunteersId(null);
      setDashboardShowCoreId(null);
    };

    const toggleParticipants = (ev) => {
      const id = ev._id || ev.id;
      setDashboardShowParticipantsId((prev) => (prev === id ? null : id));
      setDashboardShowVolunteersId(null);
      setDashboardShowCoreId(null);
      setDashboardExpandedId(null);
      setDashboardEdit(null);
      setDashboardMessage(null);
    };

    const toggleVolunteers = (ev) => {
      const id = ev._id || ev.id;
      setDashboardShowVolunteersId((prev) => (prev === id ? null : id));
      setDashboardShowParticipantsId(null);
      setDashboardShowCoreId(null);
      setDashboardExpandedId(null);
      setDashboardEdit(null);
      setDashboardMessage(null);
    };

    const toggleCore = (ev) => {
      const id = ev._id || ev.id;
      setDashboardShowCoreId((prev) => (prev === id ? null : id));
      setDashboardShowParticipantsId(null);
      setDashboardShowVolunteersId(null);
      setDashboardExpandedId(null);
      setDashboardEdit(null);
      setDashboardMessage(null);
    };

    const handleDashboardRemoveParticipant = async (eventId, participantId) => {
      if (!window.confirm("Remove this participant?")) return;
      const auth = getStoredToken();
      if (!auth) return;
      try {
        const res = await axios.delete(`${API_BASE}/api/events/${eventId}/participants/${participantId}`, {
          headers: { Authorization: `Bearer ${auth}` },
        });

        setEvents(prev => prev.map(e => (e._id || e.id) === eventId ? res.data : e));
        setDashboardMessage({ type: "success", text: "Participant removed." });
      } catch (err) {
        setDashboardMessage({ type: "error", text: getErrorMessage(err, "Failed to remove participant.") });
      }
    };

    const startEdit = (ev) => {
      const id = ev._id || ev.id;
      setDashboardExpandedId(id);
      setDashboardEdit({
        _id: id,
        title: ev.title,
        description: ev.description || "",
        date: toDateInputValue(ev.date),
        location: ev.location || "",
        category: ev.category || "",
      });
      setDashboardMessage(null);
    };

    const handleDashboardSave = async (e) => {
      e.preventDefault();
      if (!dashboardEdit) return;
      const auth = getStoredToken();
      if (!auth) {
        setDashboardMessage({ type: "error", text: "Log in to save changes." });
        return;
      }
      setDashboardSaving(true);
      setDashboardMessage(null);
      try {
        const { _id, ...body } = dashboardEdit;
        await axios.put(`${API_BASE}/api/events/${_id}`, body, {
          headers: { Authorization: `Bearer ${auth}` },
        });
        const res = await axios.get(`${API_BASE}/api/events`);
        setEvents(res.data);
        setDashboardMessage({ type: "success", text: "Changes saved." });
        setDashboardEdit(null);
        setDashboardExpandedId(null);
      } catch (err) {
        setDashboardMessage({
          type: "error",
          text: getErrorMessage(err, "Could not save changes."),
        });
      } finally {
        setDashboardSaving(false);
      }
    };

    const handleDashboardDelete = async (id) => {
      if (!window.confirm("Are you sure you want to delete this event? This action cannot be undone.")) return;
      const auth = getStoredToken();
      if (!auth) {
        setDashboardMessage({ type: "error", text: "Log in to perform actions." });
        return;
      }
      try {
        await axios.delete(`${API_BASE}/api/events/${id}`, {
          headers: { Authorization: `Bearer ${auth}` },
        });
        const res = await axios.get(`${API_BASE}/api/events`);
        setEvents(res.data);
        setDashboardMessage({ type: "success", text: "Event deleted successfully." });
        setDashboardExpandedId(null);
        setDashboardEdit(null);
      } catch (err) {
        setDashboardMessage({
          type: "error",
          text: getErrorMessage(err, "Could not delete event."),
        });
      }
    };

    return (
      <section className="page-section">
        <h2 className="page-title">Dashboard</h2>
        <div className="dashboard-next-step">
          <p>
            Plan your event with the AI assistant — timelines, requirements, and
            saved prep in one place.
          </p>
          <button
            type="button"
            className="dashboard-next-step-btn"
            onClick={() => navigate("/event-prep")}
          >
            Go to Event Prep
          </button>
        </div>
        <p className="page-subtitle">
          Browse every event in one place. Click <strong>View details</strong> to
          see the full description. If you created an event, use{" "}
          <strong>Edit</strong> to update it and save.
        </p>
        {dashboardMessage && (
          <div
            className={`alert-${dashboardMessage.type}`}
            style={{ marginBottom: "16px" }}
          >
            {dashboardMessage.text}
          </div>
        )}
        {loadingEvents ? (
          <div className="spinner"></div>
        ) : eventsError ? (
          <div className="alert-error">{eventsError}</div>
        ) : events.length === 0 ? (
          <p className="empty-text">No events yet. Create one from Create.</p>
        ) : (
          <div className="event-grid">
            {events.map((ev) => {
              const id = ev._id || ev.id;
              const expanded = dashboardExpandedId === id;
              const showingParticipants = dashboardShowParticipantsId === id;
              const showingVolunteers = dashboardShowVolunteersId === id;
              const showingCore = dashboardShowCoreId === id;
              const editing =
                dashboardEdit && String(dashboardEdit._id) === String(id);
              const owner = isOwner(ev);
              const isCore = currentUser?.role === "core";

              return (
                <div key={id} className="event-card dashboard-event-card">
                  <h3>{ev.title}</h3>
                  <div className="card-badges">
                    <span
                      className={`badge badge-${ev.category
                        ? ev.category.toLowerCase().replace(/\s+/g, "-")
                        : "other"
                        }`}
                    >
                      {ev.category || "Other"}
                    </span>
                  </div>
                  <p>
                    <span>Date:</span> {formatEventDate(ev.date)}
                  </p>
                  <p>
                    <span>Location:</span> {ev.location}
                  </p>
                  {isCore && (
                    <div className="dashboard-actions">
                      <button
                        type="button"
                        className="btn-dashboard btn-dashboard-view"
                        onClick={() => toggleExpand(ev)}
                      >
                        {expanded ? "Hide details" : "View details"}
                      </button>
                      <button
                        type="button"
                        className="btn-dashboard btn-dashboard-view"
                        onClick={() => toggleParticipants(ev)}
                        style={{ backgroundColor: showingParticipants ? '#cbd5e1' : '#f97316', color: showingParticipants ? '#1e293b' : 'white' }}
                      >
                        {showingParticipants ? "Hide Participants" : "View Participants"}
                      </button>
                      <button
                        type="button"
                        className="btn-dashboard btn-dashboard-view"
                        onClick={() => toggleVolunteers(ev)}
                        style={{ backgroundColor: showingVolunteers ? '#cbd5e1' : '#10b981', color: showingVolunteers ? '#1e293b' : 'white' }}
                      >
                        {showingVolunteers ? "Hide Volunteers" : "View Volunteers"}
                      </button>
                      <button
                        type="button"
                        className="btn-dashboard btn-dashboard-view"
                        onClick={() => toggleCore(ev)}
                        style={{ backgroundColor: showingCore ? '#cbd5e1' : '#8b5cf6', color: showingCore ? '#1e293b' : 'white' }}
                      >
                        {showingCore ? "Hide Core" : "View Core"}
                      </button>
                      <button
                        type="button"
                        className="btn-dashboard btn-dashboard-edit"
                        onClick={() =>
                          editing ? setDashboardEdit(null) : startEdit(ev)
                        }
                      >
                        {editing ? "Cancel edit" : "Edit"}
                      </button>
                      <button
                        type="button"
                        className="btn-dashboard btn-dashboard-delete"
                        onClick={() => handleDashboardDelete(id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}

                  {!isCore && (
                    <div className="dashboard-actions">
                      <button
                        type="button"
                        className="btn-dashboard btn-dashboard-view"
                        onClick={() => toggleExpand(ev)}
                      >
                        {expanded ? "Hide details" : "View details"}
                      </button>
                      <button
                        type="button"
                        className="btn-dashboard btn-dashboard-view"
                        onClick={() => toggleParticipants(ev)}
                        style={{ backgroundColor: showingParticipants ? '#cbd5e1' : '#f97316', color: showingParticipants ? '#1e293b' : 'white' }}
                      >
                        {showingParticipants ? "Hide Participants" : "View Participants"}
                      </button>
                      <button
                        type="button"
                        className="btn-dashboard btn-dashboard-view"
                        onClick={() => toggleVolunteers(ev)}
                        style={{ backgroundColor: showingVolunteers ? '#cbd5e1' : '#10b981', color: showingVolunteers ? '#1e293b' : 'white' }}
                      >
                        {showingVolunteers ? "Hide Volunteers" : "View Volunteers"}
                      </button>
                      <button
                        type="button"
                        className="btn-dashboard btn-dashboard-view"
                        onClick={() => toggleCore(ev)}
                        style={{ backgroundColor: showingCore ? '#cbd5e1' : '#8b5cf6', color: showingCore ? '#1e293b' : 'white' }}
                      >
                        {showingCore ? "Hide Core" : "View Core"}
                      </button>
                    </div>
                  )}

                  {(showingParticipants || showingVolunteers || showingCore) && !editing && (
                    <div className="dashboard-detail">
                      {(() => {
                        const filteredList = ev.participants ? ev.participants.filter(p => {
                          // Catch cases where role is exactly missing and normalize casing
                          const rawRole = p.role ? String(p.role).toLowerCase() : '';

                          if (showingCore) return rawRole === 'core';
                          if (showingVolunteers) return rawRole === 'volunteer';

                          // For Participants view, it should strictly be 'participant'.
                          // But if there's any fallback/undefined role in legacy DB rows, 
                          // safely bin them as a general participant rather than skipping them entirely.
                          if (showingParticipants) {
                            return rawRole === 'participant' || (rawRole !== 'core' && rawRole !== 'volunteer');
                          }
                          return false;
                        }) : [];

                        let titleLabel = "Participants";
                        if (showingVolunteers) titleLabel = "Volunteers";
                        if (showingCore) titleLabel = "Core Members";

                        return (
                          <>
                            <p className="dashboard-detail-label" style={{ marginBottom: '10px' }}>{titleLabel} ({filteredList.length})</p>
                            {filteredList.length === 0 ? (
                              <p style={{ fontSize: '14px', color: '#64748b' }}>No {titleLabel.toLowerCase()} yet.</p>
                            ) : (
                              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                                {filteredList.map(p => {
                                  const pId = p._id || p;
                                  const isMe = pId === currentUserId;
                                  return (
                                    <li key={pId} style={{ padding: '10px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', borderRadius: '6px', marginBottom: '6px' }}>
                                      <div>
                                        <span style={{ fontWeight: '600', color: '#1e293b', display: 'block' }}>{p.name || 'Unknown User'} {isMe && '(You)'}</span>
                                        <span style={{ fontSize: '12px', color: '#64748b' }}>{p.email || 'No email provided'} &bull; {p.role || 'user'}</span>
                                      </div>
                                      {isCore && !isMe && (
                                        <button
                                          onClick={() => handleDashboardRemoveParticipant(id, pId)}
                                          style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'none', padding: '6px 12px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold' }}
                                        >
                                          Remove
                                        </button>
                                      )}
                                    </li>
                                  );
                                })}
                              </ul>
                            )}
                          </>
                        );
                      })()}
                    </div>
                  )}

                  {expanded && !editing && (
                    <div className="dashboard-detail">
                      <p className="dashboard-detail-label">Description</p>
                      <p className="dashboard-detail-desc">
                        {ev.description || "No description provided."}
                      </p>
                      <p className="dashboard-detail-meta">
                        <span>Category:</span> {ev.category}
                      </p>
                    </div>
                  )}

                  {expanded && editing && dashboardEdit && (
                    <form
                      className="dashboard-edit-form"
                      onSubmit={handleDashboardSave}
                    >
                      <label htmlFor={`dash-title-${id}`}>Title</label>
                      <input
                        id={`dash-title-${id}`}
                        value={dashboardEdit.title}
                        onChange={(e) =>
                          setDashboardEdit({
                            ...dashboardEdit,
                            title: e.target.value,
                          })
                        }
                        required
                      />
                      <label htmlFor={`dash-desc-${id}`}>Description</label>
                      <textarea
                        id={`dash-desc-${id}`}
                        value={dashboardEdit.description}
                        onChange={(e) =>
                          setDashboardEdit({
                            ...dashboardEdit,
                            description: e.target.value,
                          })
                        }
                        required
                      />
                      <label htmlFor={`dash-date-${id}`}>Date</label>
                      <input
                        id={`dash-date-${id}`}
                        type="date"
                        value={dashboardEdit.date}
                        onChange={(e) =>
                          setDashboardEdit({
                            ...dashboardEdit,
                            date: e.target.value,
                          })
                        }
                        required
                      />
                      <label htmlFor={`dash-loc-${id}`}>Location</label>
                      <input
                        id={`dash-loc-${id}`}
                        value={dashboardEdit.location}
                        onChange={(e) =>
                          setDashboardEdit({
                            ...dashboardEdit,
                            location: e.target.value,
                          })
                        }
                        required
                      />
                      <label htmlFor={`dash-cat-${id}`}>Category</label>
                      <input
                        id={`dash-cat-${id}`}
                        value={dashboardEdit.category}
                        onChange={(e) =>
                          setDashboardEdit({
                            ...dashboardEdit,
                            category: e.target.value,
                          })
                        }
                        required
                      />
                      <div className="dashboard-form-actions">
                        <button
                          type="submit"
                          disabled={dashboardSaving}
                        >
                          {dashboardSaving ? "Saving…" : "Save changes"}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>
    );
  };

  const renderPage = () => {
    switch (currentPage) {
      case "landing":
        return <Landing />;
      case "home":
        return renderHome();
      case "login":
        return renderLogin();
      case "create":
        return <CreateEvent currentUser={currentUser} />;
      case "dashboard":
        return renderDashboard();
      case "eventPrep":
        return (
          <EventPrep
            apiBase={API_BASE}
            getToken={getStoredToken}
            getErrorMessage={getErrorMessage}
            currentUser={currentUser}
            onNavigateLogin={() => navigate("/login")}
          />
        );
      case "chatbox":
        return (
          <Groups
            apiBase={API_BASE}
            getToken={getStoredToken}
            getErrorMessage={getErrorMessage}
            currentUser={currentUser}
            onNavigateLogin={() => navigate("/login")}
          />
        );
      case "profile":
        return <Profile currentUser={currentUser} />;
      default:
        return <Landing />;
    }
  };

  const isLanding = currentPage === "landing";
  const isLogin = currentPage === "login";
  const isFullBleed = isLanding || isLogin;

  return (
    <div 
      className={`app-shell${isLogin ? " app-shell--fullbleed" : ""}${(currentPage === "home" || currentPage === "create" || currentPage === "dashboard" || currentPage === "chatbox" || currentPage === "eventPrep" || currentPage === "profile") ? " bg-slate-950 text-slate-100" : ""}`}
    >
      {currentPage === "home" && (
        <>
          {/* Premium background grid overlay (from Login) - Animated for Create Page */}
          <div className={`absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none ${currentPage === "create" ? "animate-grid-movement" : ""}`} />
          
          {/* Glowing backdrop aurora spheres (from Login) - Animated for Create Page */}
          <div className={`absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-violet-600/5 blur-[120px] pointer-events-none ${currentPage === "create" ? "animate-aurora-1" : ""}`} />
          <div className={`absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-rose-600/5 blur-[120px] pointer-events-none ${currentPage === "create" ? "animate-aurora-2" : ""}`} />
        </>
      )}

      {(currentPage === "create" || currentPage === "dashboard" || currentPage === "chatbox" || currentPage === "eventPrep" || currentPage === "profile") && (
        <div className="dashboard-bubble-bg overflow-hidden absolute inset-0 pointer-events-none z-0">
          {/* Multi-colored Random Popping Bubbles */}
          {[...Array(35)].map((_, i) => {
             const size = Math.random() * 50 + 20; // 20px to 70px
             const colors = [
               'rgba(59, 130, 246, 0.2)',  // Blue
               'rgba(168, 85, 247, 0.2)',  // Purple
               'rgba(236, 72, 153, 0.2)',  // Pink
               'rgba(16, 185, 129, 0.2)',  // Emerald
               'rgba(147, 51, 234, 0.2)',  // Violet
               'rgba(6, 182, 212, 0.2)'    // Cyan
             ];
             const randomColor = colors[Math.floor(Math.random() * colors.length)];
             
             return (
               <div 
                 key={i} 
                 className="floating-bubble" 
                 style={{
                   left: `${Math.random() * 100}%`,
                   top: `${Math.random() * 100}%`,
                   width: `${size}px`,
                   height: `${size}px`,
                   background: `radial-gradient(circle at 30% 30%, ${randomColor}, transparent)`,
                   animationDuration: `${Math.random() * 6 + 4}s`, // Pop up speed (4s to 10s)
                   animationDelay: `${Math.random() * 10}s` // Stagger them heavily
                 }}
               ></div>
             );
          })}
        </div>
      )}

      {!isFullBleed && currentPage !== "home" && currentPage !== "create" && currentPage !== "dashboard" && currentPage !== "profile" && (
        <>
          <div className="global-orb orb-1"></div>
          <div className="global-orb orb-2"></div>
          <div className="global-orb orb-3"></div>
        </>
      )}

      {!isFullBleed && (
        <nav className="top-navbar futuristic-nav">
          <div className="nav-left">
            <h2 className="navbar-brand">
              <button
                type="button"
                className="navbar-brand-btn"
                onClick={() => navigate("/home")}
              >
                <div className="navbar-logo-icon"></div>
                MeetSphere
              </button>
            </h2>
          </div>
          <div className="nav-center">
            <button type="button" className={`nav-link ${currentPage === 'home' ? 'active' : ''}`} onClick={() => navigate("/home")}>
              <span className="icon">🏠</span> Home
            </button>
            <button type="button" className="nav-link" onClick={() => navigate("/create")}>
              <span className="icon">⊕</span> Create
            </button>
            <button type="button" className={`nav-link ${currentPage === 'dashboard' ? 'active' : ''}`} onClick={() => navigate("/dashboard")}>
              <span className="icon">⊞</span> Dashboard
            </button>
            <button type="button" className={`nav-link ${currentPage === 'eventPrep' ? 'active' : ''}`} onClick={() => navigate("/event-prep")}>
              <span className="icon">🗓️</span> Event Prep
            </button>
            <button type="button" className={`nav-link ${currentPage === 'chatbox' ? 'active' : ''}`} onClick={() => navigate("/chatbox")}>
              <span className="icon">💬</span> Chatbox
            </button>
          </div>
          <div className="nav-right">
            <button type="button" className="icon-btn" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? "☀️" : "🌙"}
            </button>
            <button type="button" className="icon-btn notification-btn">
              🔔<span className="badge-count">3</span>
            </button>
            <div className="relative">
              <div className="user-profile-nav" onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}>
                <div className="avatar-circle">
                  {currentUser?.name ? currentUser.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'U'}
                </div>
                <span className="user-name">{currentUser?.name || "User"}</span>
                <span className="dropdown-arrow" style={{ transform: profileDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▼</span>
              </div>
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl overflow-hidden z-[100] transition-all">
                  {currentUser && (
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">{currentUser.name}</p>
                      <p className="text-xs text-slate-500 truncate">{currentUser.email || 'user@example.com'}</p>
                    </div>
                  )}
                  <div className="py-1">
                    <button 
                      type="button"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        navigate("/profile");
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      Your Profile
                    </button>
                    <button 
                      type="button"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        localStorage.removeItem("token");
                        localStorage.removeItem("user");
                        setCurrentUser(null);
                        navigate("/login");
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
            {!currentUser && (
               <button type="button" className="nav-link" onClick={() => navigate("/login")}>
                 Login
               </button>
            )}
          </div>
        </nav>
      )}

      {isLogin ? (
        renderLogin()
      ) : (
        <main
          className={
            isLanding ? "page-content page-content--landing" : "page-content"
          }
        >
          {renderPage()}
        </main>
      )}
    </div>
  );
}

export default App;
