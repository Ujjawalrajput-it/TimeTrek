import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

const CountdownCard = ({ event, onDelete, onEdit }) => {
  const calculateTimeLeft = () => {
    const now = dayjs();
    const target = dayjs(event.dateTime);
    const diff = target.diff(now);

    if (diff <= 0) return null;

    const d = dayjs.duration(diff);

    return {
      days: Math.floor(d.asDays()),
      hours: d.hours(),
      minutes: d.minutes(),
      seconds: d.seconds(),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const updated = calculateTimeLeft();
      if (!updated) {
        clearInterval(timer);
      }
      setTimeLeft(updated);
    }, 1000);

    return () => clearInterval(timer);
  }, [event.dateTime]);

  if (!timeLeft) {
    return (
      <div className="countdown-card">
        <h3>{event.title}</h3>
        <p>⏰ Event Started or Expired!</p>
        <button onClick={() => onDelete(event.id)}>Delete</button>
        <button onClick={() => onEdit(event)}>Edit</button>
      </div>
    );
  }

  return (
    <div className="countdown-card">
      <h3>{event.title}</h3>
      <p>
        {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
      </p>
      <button onClick={() => onDelete(event.id)}>Delete</button>
      <button onClick={() => onEdit(event)}>Edit</button>

    </div>
  );
};

export default CountdownCard;
