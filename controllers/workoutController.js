const Workout = require('../models/workout');

// Get all workouts
const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find().sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch all workouts' });
  }
};

// Get workout by ID
const getWorkoutById = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (!workout)
      return res.status(404).json({ message: 'Workout not found' });

    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ message: 'Invalid workout ID' });
  }
};

// Workout source info
const getWorkoutSource = (req, res) => {
  res.status(200).json({
    source: "Fitness Tracker API",
    version: "1.0",
    maintainer: "James,Vladymere,Ellix",
    message: "Workout data provided for testing and training."
  });
};

// Add new workout
const addWorkout = async (req, res) => {
  try {
    const workout = new Workout(req.body);
    await workout.save();
    res.status(201).json({
      message: 'Workout added successfully',
      workout
    });
  } catch (error) {
    res.status(400).json({ message: 'Failed to create workout' });
  }
};

// Full update
const updateWorkout = async (req, res) => {
  try {
    const workout = await Workout.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!workout)
      return res.status(404).json({ message: 'Workout not found' });

    res.status(200).json({
      message: 'Workout updated successfully',
      workout
    });
  } catch (error) {
    res.status(400).json({ message: 'Failed to update workout' });
  }
};

// Partial update
const patchWorkout = async (req, res) => {
  try {
    const workout = await Workout.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!workout)
      return res.status(404).json({ message: 'Workout not found' });

    res.status(200).json({
      message: 'Workout partially updated',
      workout
    });
  } catch (error) {
    res.status(400).json({ message: 'Failed to partially update workout' });
  }
};

// Delete workout
const deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id);

    if (!workout)
      return res.status(404).json({ message: 'Workout not found' });

    res.status(200).json({ message: 'Workout deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Invalid workout ID' });
  }
};

module.exports = {
  getWorkouts,
  addWorkout,
  updateWorkout,
  patchWorkout,
  deleteWorkout,
  getWorkoutById,
  getWorkoutSource
};
