import React, { useState, useEffect } from "react";
import EventForm from "./components/EventForm";
import EventList from "./components/EventList";
import "./App.css";

const App = () => {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) setEvents(JSON.parse(storedEvents));
  }, []);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const addEvent = (newEvent) => setEvents([...events, newEvent]);

  const updateEvent = (updatedEvent) => {
    setEvents(events.map((e) => (e.id === updatedEvent.id ? updatedEvent : e)));
    setEditingEvent(null);
  };

  const deleteEvent = (id) => setEvents(events.filter((event) => event.id !== id));

  const editEvent = (event) => setEditingEvent(event);

  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.dateTime) - new Date(b.dateTime)
  );

  const expiredCount = events.filter(e => new Date(e.dateTime) < new Date()).length;
  const upcomingCount = events.length - expiredCount;

  return (
    <div className="app">
      <h1>⏳ TimeTrek – Countdown App</h1>
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <p>📅 Upcoming Events: {upcomingCount} | ❌ Expired: {expiredCount}</p>
      </div>
      <EventForm
        onAddEvent={addEvent}
        onUpdateEvent={updateEvent}
        editingEvent={editingEvent}
      />
      <EventList
        events={sortedEvents}
        onDelete={deleteEvent}
        onEdit={editEvent}
      />
    </div>
  );
};

export default App;
