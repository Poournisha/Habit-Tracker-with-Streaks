const Habit = require("../models/Habit");

// ✅ Create a new habit
exports.createHabit = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newHabit = new Habit({
      userId: req.user.id,
      name,
      description
    });
    await newHabit.save();
    res.status(201).json(newHabit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get all habits for the logged-in user
exports.getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.user.id });
    res.json(habits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Mark habit as completed for today
exports.checkIn = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) return res.status(404).json({ message: "Habit not found" });

    const today = new Date().setHours(0, 0, 0, 0);
    const existingEntry = habit.progress.find(
      (p) => new Date(p.date).setHours(0, 0, 0, 0) === today
    );

    if (existingEntry) {
      existingEntry.completed = true;
    } else {
      habit.progress.push({ date: new Date(), completed: true });
    }

    // calculate streak
    habit.streak = calculateStreak(habit.progress);
    await habit.save();

    res.json(habit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Helper to calculate streak
function calculateStreak(progress) {
  let streak = 0;
  let today = new Date().setHours(0, 0, 0, 0);

  for (let i = progress.length - 1; i >= 0; i--) {
    let entryDate = new Date(progress[i].date).setHours(0, 0, 0, 0);

    if (progress[i].completed && entryDate === today) {
      streak++;
      today -= 24 * 60 * 60 * 1000; // go to previous day
    } else if (entryDate < today) {
      break;
    }
  }
  return streak;
}
