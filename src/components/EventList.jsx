import React from "react";
import CountdownCard from "./CountdownCard";

const EventList = ({ events, onDelete, onEdit }) => {
  if (events.length === 0) {
    return (
      <p style={{ textAlign: "center", fontStyle: "italic", marginTop: "2rem" }}>
         No upcoming events. Add one!
      </p>
   );

  }

  return (
    <div className="event-list">
      {events.map((event) => (
        <CountdownCard
          key={event.id}
          event={event}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default EventList;
