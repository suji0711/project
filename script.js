const form = document.getElementById("taskForm");
const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");
const filter = document.getElementById("filter");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Display tasks
function renderTasks() {
  list.innerHTML = "";

  const filteredTasks = tasks.filter(task => {
    if (filter.value === "completed") return task.completed;
    if (filter.value === "pending") return !task.completed;
    return true;
  });

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");

    li.textContent = task.text;
    if (task.completed) li.classList.add("completed");

    // Toggle complete
    li.addEventListener("click", () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
    });

    // Delete button
    const btn = document.createElement("button");
    btn.textContent = "X";

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      tasks.splice(index, 1);
      saveTasks();
    });

    li.appendChild(btn);
    list.appendChild(li);
  });
}

// Save to local storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Add task
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input.value.trim() === "") {
    alert("Task cannot be empty!");
    return;
  }

  tasks.push({ text: input.value, completed: false });
  input.value = "";
  saveTasks();
});

// Filter change
filter.addEventListener("change", renderTasks);

// Initial load
renderTasks();