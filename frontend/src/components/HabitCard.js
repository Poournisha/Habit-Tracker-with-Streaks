import api from "../api";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import "./HabitCard.css";

export default function HabitCard({ habit }) {
  const handleCheckIn = async () => {
    try {
      await api.post(`/habits/${habit._id}/checkin`);
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.error || "Check-in failed");
    }
  };

  // Prepare heatmap values
  const heatmapValues = habit.progress.map(p => ({
    date: new Date(p.date).toISOString().split("T")[0],
    count: p.completed ? 1 : 0,
  }));

  return (
    <div className="habit-card">
      <h3>{habit.name}</h3>
      {habit.description && <p>{habit.description}</p>}
      <button className="checkin-btn" onClick={handleCheckIn}>Check-in</button>
      <div className="calendar-container">
        <CalendarHeatmap
          startDate={new Date(new Date().setMonth(new Date().getMonth() - 2))}
          endDate={new Date()}
          values={heatmapValues}
          classForValue={value => {
            if (!value) return "color-empty";
            return value.count > 0 ? "color-filled" : "color-empty";
          }}
          showWeekdayLabels={true}
        />
      </div>
      <p>🔥 Current streak: {habit.streak} days</p>
    </div>
  );
}
