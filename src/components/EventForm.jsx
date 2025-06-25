import React, { useEffect, useState } from "react";

const EventForm = ({ onAddEvent, onUpdateEvent, editingEvent }) => {
  const [title, setTitle] = useState("");
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    if (editingEvent) {
      setTitle(editingEvent.title);
      setDateTime(editingEvent.dateTime);
    } else {
      setTitle("");
      setDateTime("");
    }
  }, [editingEvent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !dateTime) return;

    const event = {
      id: editingEvent ? editingEvent.id : Date.now(),
      title,
      dateTime,
    };

    editingEvent ? onUpdateEvent(event) : onAddEvent(event);
    setTitle("");
    setDateTime("");
  };

  return (
    <form onSubmit={handleSubmit} className="event-form">
      <input
        type="text"
        placeholder="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="datetime-local"
        value={dateTime}
        onChange={(e) => {
          const value = e.target.value;
          const parts = value.split("T");
          if (parts.length === 2) {
            const [date, time] = parts;
            const [year, month, day] = date.split("-");
            if (year.length > 4) return;
            const correctedDate = `${year}-${month}-${day}`;
            const newValue = `${correctedDate}T${time}`;
            setDateTime(newValue);
          } else {
            setDateTime(value);
          }
        }}
        min="2020-01-01T00:00"
        max="2100-12-31T23:59"
        required
      />
      <button type="submit">
        {editingEvent ? "Update Event" : "Add Event"}
      </button>
    </form>
  );
};

export default EventForm;
