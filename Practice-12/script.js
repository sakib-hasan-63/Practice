// - Kanban Task Board

// Getting HTML elements
const taskForm = document.querySelector("#taskForm");
const taskTitle = document.querySelector("#taskTitle");
const taskPriority = document.querySelector("#taskPriority");
const taskStatus = document.querySelector("#taskStatus");

const todoList = document.querySelector("#todoList");
const progressList = document.querySelector("#progressList");
const completedList = document.querySelector("#completedList");

const todoCount = document.querySelector("#todoCount");
const progressCount = document.querySelector("#progressCount");
const completedCount = document.querySelector("#completedCount");

const clearCompleted = document.querySelector("#clearCompleted");


// Get saved tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("kanban_tasks")) || [];


// Save tasks in localStorage
function saveTasks() {
    localStorage.setItem("kanban_tasks", JSON.stringify(tasks));
}


// Get color according to priority
function getPriorityColor(priority) {

    if (priority === "High") {
        return "text-red-400";
    }

    if (priority === "Medium") {
        return "text-yellow-400";
    }

    return "text-green-400";
}


// Create a task card
function createTaskCard(task) {

    const card = document.createElement("div");

    card.className =
        "bg-slate-800 p-4 rounded-xl border border-slate-700";


    card.innerHTML = `
        <div class="flex justify-between items-center gap-3">

            <h3 class="font-bold">
                ${task.title}
            </h3>

            <button
                class="delete-task text-red-400 text-xl"
                data-id="${task.id}">
                ×
            </button>

        </div>


        <div class="flex justify-between items-center mt-4">

            <span class="${getPriorityColor(task.priority)} text-sm font-semibold">
                ${task.priority}
            </span>


            <select
                class="status-change bg-slate-900 text-sm px-2 py-1 rounded-lg"
                data-id="${task.id}">

                <option value="todo"
                    ${task.status === "todo" ? "selected" : ""}>
                    To Do
                </option>

                <option value="progress"
                    ${task.status === "progress" ? "selected" : ""}>
                    In Progress
                </option>

                <option value="completed"
                    ${task.status === "completed" ? "selected" : ""}>
                    Completed
                </option>

            </select>

        </div>
    `;

    return card;
}


// Show all tasks on the page
function displayTasks() {

    // Clear old tasks
    todoList.innerHTML = "";
    progressList.innerHTML = "";
    completedList.innerHTML = "";


    // Separate tasks according to their status
    const todoTasks = tasks.filter(function(task) {
        return task.status === "todo";
    });

    const progressTasks = tasks.filter(function(task) {
        return task.status === "progress";
    });

    const completedTasks = tasks.filter(function(task) {
        return task.status === "completed";
    });


    // Display To Do tasks
    todoTasks.forEach(function(task) {
        todoList.appendChild(createTaskCard(task));
    });


    // Display In Progress tasks
    progressTasks.forEach(function(task) {
        progressList.appendChild(createTaskCard(task));
    });


    // Display Completed tasks
    completedTasks.forEach(function(task) {
        completedList.appendChild(createTaskCard(task));
    });


    // Update task counters
    todoCount.textContent = todoTasks.length;
    progressCount.textContent = progressTasks.length;
    completedCount.textContent = completedTasks.length;
}


// Add new task
taskForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const title = taskTitle.value.trim();


    // Check empty title
    if (title === "") {
        alert("Please enter a task title");
        return;
    }


    // Create task object
    const newTask = {

        id: Date.now(),

        title: title,

        priority: taskPriority.value,

        status: taskStatus.value,

        createdAt: new Date().toISOString()
    };


    // Add task to array
    tasks.push(newTask);


    // Save task
    saveTasks();


    // Update UI
    displayTasks();


    // Clear form
    taskForm.reset();

});


// Delete task
document.addEventListener("click", function(event) {

    if (!event.target.classList.contains("delete-task")) {
        return;
    }


    const taskId = Number(event.target.dataset.id);


    // Remove selected task
    tasks = tasks.filter(function(task) {
        return task.id !== taskId;
    });


    // Save updated tasks
    saveTasks();


    // Refresh task list
    displayTasks();

});


// Change task status
document.addEventListener("change", function(event) {

    if (!event.target.classList.contains("status-change")) {
        return;
    }


    const taskId = Number(event.target.dataset.id);

    const newStatus = event.target.value;


    // Find task and update its status
    tasks.forEach(function(task) {

        if (task.id === taskId) {
            task.status = newStatus;
        }

    });


    // Save changes
    saveTasks();


    // Refresh board
    displayTasks();

});


// Delete all completed tasks
clearCompleted.addEventListener("click", function() {

    tasks = tasks.filter(function(task) {
        return task.status !== "completed";
    });


    saveTasks();

    displayTasks();

});


// Load tasks when page opens
displayTasks();
