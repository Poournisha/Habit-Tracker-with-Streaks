const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  description: { type: String },
  creationDate: { type: Date, default: Date.now },
  progress: [
    {
      date: { type: Date },
      completed: { type: Boolean }
    }
  ],
  streak: { type: Number, default: 0 }
});

module.exports = mongoose.model("Habit", habitSchema);
