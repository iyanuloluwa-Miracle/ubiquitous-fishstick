// routes/task.route.js
const express = require('express');
const router = express.Router();
//const authMiddleware = require('../middlewares/authMiddleware');
const taskController = require('../controllers/taskController');
const { verifyToken } = require("../helper/authUtils");

// // Apply authentication middleware to protect task routes
// router.use(authMiddleware.authenticateUser);

// Task CRUD routes
router.post('/tasks',verifyToken, taskController.createTask); // Create a task
router.get('/tasks',verifyToken, taskController.getAllTasks); // Get all tasks
router.get('/tasks/:id',verifyToken, taskController.getTaskById); // Get a task by ID
router.put('/tasks/:id',verifyToken,taskController.updateTaskById); // Update a task by ID
router.delete('/tasks/:id',verifyToken,taskController.deleteTaskById); // Delete a task by ID

module.exports = router;
