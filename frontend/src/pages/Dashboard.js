import { useEffect, useState } from "react";
import api from "../api";
import HabitCard from "../components/HabitCard";
import "./Dashboard.css";

export default function Dashboard() {
  const [habits, setHabits] = useState([]);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  // Load habits and username
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/habits");
        setHabits(res.data);
        setUsername(localStorage.getItem("username") || "");
      } catch (err) {
        alert("Failed to load habits");
      }
    };
    fetchData();
  }, []);

  const createHabit = async () => {
    if (!name) return alert("Enter a habit name");
    try {
      const res = await api.post("/habits", { name });
      setHabits([...habits, res.data]);
      setName("");
    } catch (err) {
      alert(err.response?.data?.error || "Error creating habit");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = "/";
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {username}!</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <div className="habit-form">
        <input
          placeholder="New habit"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button onClick={createHabit}>Add</button>
      </div>

      <div className="habit-list">
        {habits.map(habit => (
          <HabitCard key={habit._id} habit={habit} />
        ))}
      </div>
    </div>
  );
}
