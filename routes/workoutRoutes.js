const express = require('express');
const router = express.Router();

const { validateWorkout } = require('../middlewares/validationMiddleware');
const {
  getWorkouts,
  addWorkout,
  updateWorkout,
  patchWorkout,
  deleteWorkout,
  getWorkoutById,
  getWorkoutSource
} = require('../controllers/workoutController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Workout:
 *       type: object
 *       required:
 *         - name
 *         - type
 *         - duration
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         type:
 *           type: string
 *         duration:
 *           type: number
 *         caloriesBurned:
 *           type: number
 *         date:
 *           type: string
 *           format: date
 */

/**
 * @swagger
 * tags:
 *   name: Workouts
 *   description: Workout management
 */

/**
 * @swagger
 * /api/v1/workout:
 *   get:
 *     summary: Get all workouts
 *     tags: [Workouts]
 *     responses:
 *       200:
 *         description: List of workouts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Workout'
 */

/**
 * @swagger
 * /api/v1/workout:
 *   post:
 *     summary: Add a workout
 *     tags: [Workouts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Workout'
 *     responses:
 *       201:
 *         description: Workout created
 */

/**
 * @swagger
 * /api/v1/workout/{id}:
 *   put:
 *     summary: Update a workout (full update)
 *     tags: [Workouts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Workout'
 *     responses:
 *       200:
 *         description: Updated successfully
 *
 *   patch:
 *     summary: Update a workout (partial)
 *     tags: [Workouts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Updated successfully
 *
 *   delete:
 *     summary: Delete a workout
 *     tags: [Workouts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted successfully
 */
/**
 * @swagger
 * /api/v1/workout/source/info:
 *   get:
 *     summary: Get API source information
 *     tags: [Workouts]
 *     responses:
 *       200:
 *         description: API source details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 source:
 *                   type: string
 *                 version:
 *                   type: string
 *                 maintainer:
 *                   type: string
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 * /api/v1/workout/{id}:
 *   get:
 *     summary: Get a workout by ID
 *     tags: [Workouts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The workout ID
 *     responses:
 *       200:
 *         description: Workout found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Workout'
 *       404:
 *         description: Workout not found
 */

//ACTUAL ROUTES
router.get('/', getWorkouts);
router.post('/', validateWorkout, addWorkout);

router.get('/source/info', getWorkoutSource);   // <-- Must be before /:id
router.get('/:id', getWorkoutById);

router.put('/:id', validateWorkout, updateWorkout);
router.patch('/:id', patchWorkout);
router.delete('/:id', deleteWorkout);

module.exports = router;
