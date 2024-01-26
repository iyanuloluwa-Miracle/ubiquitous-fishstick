// controllers/taskController.js
const { Task } = require('../models/tasks');

// Create a task
const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const task = await Task.create({ title, description, status});

    res.status(201).json({
      success: true,
      data: task,
      message: 'Task created successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      data: null,
      error: error.message,
      message: 'Task creation failed',
    });
  }
};

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();

    res.status(200).json({
      success: true,
      data: tasks,
      message: 'Tasks retrieved successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      data: null,
      error: error.message,
      message: 'Failed to retrieve tasks',
    });
  }
};

// Get a specific task by ID
const getTaskById = async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'Task not found',
      });
    }

    res.status(200).json({
      success: true,
      data: task,
      message: 'Task retrieved successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      data: null,
      error: error.message,
      message: 'Failed to retrieve task',
    });
  }
};

// Update a task by ID
const updateTaskById = async (req, res) => {
  const taskId = req.params.id;
  const { title, description, status,} = req.body;

  try {
    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'Task not found',
      });
    }

    // Update task fields
    task.title = title;
    task.description = description;
    task.status = status;

    await task.save();

    res.status(200).json({
      success: true,
      data: task,
      message: 'Task updated successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      data: null,
      error: error.message,
      message: 'Failed to update task',
    });
  }
};

// Delete a task by ID
const deleteTaskById = async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'Task not found',
      });
    }

    await task.destroy();

    res.status(200).json({
      success: true,
      data: null,
      message: 'Task deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      data: null,
      error: error.message,
      message: 'Failed to delete task',
    });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
};
