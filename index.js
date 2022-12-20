const express = require("express");
const app = express();
const utils = require("./utils/validator.js");
app.use(express.json());
const tasks = [
  {
    id: 1,
    name: "Task1",
    completed: false,
  },
  {
    id: 2,
    name: "Task2",
    completed: false,
  },
  {
    id: 1,
    name: "Task3",
    completed: false,
  },
];

//GET
app.get("/api/tasks", (req, res) => {
  res.send(tasks);
});
app.get("/api/tasks/:id", (req, res) => {
  const taskId = req.params.id;
  const task = tasks.find((task) => task.id === parseInt(taskId));
  if (!task) {
    return res
      .status(404)
      .send("The task with the provided ID does not exists..");
  }
  res.send(task);
});
// POST;
app.post("/api/tasks", (req, res) => {
  const { error } = utils.validateTask(req.body);

  if (error)
    return res.status(400).send("The name should be at least 3 chars long!");

  const task = {
    id: tasks.length + 1,
    name: req.body.name,
    completed: req.body.completed,
  };

  tasks.push(task);
  res.status(201).send(task);
});
//PUT
app.put("/api/tasks/:id", (req, res) => {
  const taskId = req.params.id;
  const task = tasks.find((task) => task.id === parseInt(taskId));
  if (!task)
    return res
      .status(404)
      .send("The task with the provided ID does not exist.");

  const { error } = utils.validateTask(req.body);

  if (error)
    return res.status(400).send("The name should be at least 3 chars long!");

  task.name = req.body.name;
  task.completed = req.body.completed;

  res.send(task);
});

//DELETE
app.delete("/api/tasks/:id", (req, res) => {
  const taskId = req.params.id;
  const task = tasks.find((task) => task.id === parseInt(taskId));
  if (!task)
    return res
      .status(404)
      .send("The task with the provided ID does not exist.");

  const index = tasks.indexOf(task);
  tasks.splice(index, 1);
  res.send(task);
});

const server = app.listen(3000, () => {
  console.log("server listening at port 3000");
});
module.exports = server;
