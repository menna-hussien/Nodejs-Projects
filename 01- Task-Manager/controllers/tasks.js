const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res) => {
  const { id: TaskId } = req.params;
  const task = await Task.findOne({ _id: req.params.id });

  if (!task) {
    return res.status(404).json({
      msg: `no task with this id : ${TaskId}`,
    });
  }
  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: TaskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: TaskID }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: TaskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: TaskID });
  if (!task) {
    return res.status(404).json({ msg: `no task with this id : ${TaskID}` });
  }

  res.status(200).json({ task: null, status: 'success' });
});

module.exports = { getAllTasks, getTask, createTask, updateTask, deleteTask };
