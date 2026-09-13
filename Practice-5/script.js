// DAY 3 — DOM + Events
// File: day-3-task-manager.js

const app = document.createElement("div");

app.innerHTML = `
  <h1>Task Manager</h1>

  <input
    id="taskInput"
    type="text"
    placeholder="Enter your task"
  />

  <select id="priority">
    <option value="low">Low</option>
    <option value="medium">Medium</option>
    <option value="high">High</option>
  </select>

  <button id="addTask">Add Task</button>

  <ul id="taskList"></ul>
`;

document.body.appendChild(app);

const taskInput = document.querySelector("#taskInput");
const priority = document.querySelector("#priority");
const addTask = document.querySelector("#addTask");
const taskList = document.querySelector("#taskList");

let tasks = [];

const renderTasks = () => {
  taskList.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>${task.title}</span>
      <strong> [${task.priority}] </strong>
      <button data-id="${task.id}">
        Delete
      </button>
    `;

    if (task.completed) {
      li.style.textDecoration = "line-through";
    }

    li.querySelector("span").addEventListener(
      "click",
      () => {
        task.completed = !task.completed;
        renderTasks();
      }
    );

    li.querySelector("button").addEventListener(
      "click",
      () => {
        tasks = tasks.filter(
          item => item.id !== task.id
        );

        renderTasks();
      }
    );

    taskList.appendChild(li);
  });
};

addTask.addEventListener("click", () => {
  const title = taskInput.value.trim();

  if (!title) {
    alert("Please enter a task");
    return;
  }

  const task = {
    id: Date.now(),
    title,
    priority: priority.value,
    completed: false
  };

  tasks.push(task);

  taskInput.value = "";

  renderTasks();
});

taskInput.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    addTask.click();
  }
});