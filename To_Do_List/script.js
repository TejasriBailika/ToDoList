const taskInput = document.getElementById("taskInput");
const addbtn = document.getElementById("addbtn");
const taskList = document.getElementById("taskList");

addbtn.addEventListener("click", function () {
  const content = taskInput.value.trim();
  if (content !== "") {
    addTask(content, false);
    taskInput.value = "";
    saveTasksToLocal();
  } else {
    alert("Please enter a task.");
  }
});

function addTask(text, completed) {
  const taskItem = document.createElement("li");
  taskItem.classList.add("taskItemclass");
  if (completed) taskItem.classList.add("completed");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("checkboxclass");
  checkbox.checked = completed;

  const span = document.createElement("span");
  span.innerText = text;
  span.classList.add("tasktext");

  const del = document.createElement("button");
  del.innerText = "X";
  del.classList.add("deletbtnclass");

  checkbox.addEventListener("change", function () {
    taskItem.classList.toggle("completed");
    saveTasksToLocal();
  });

  del.addEventListener("click", function () {
    taskItem.remove();
    saveTasksToLocal();
  });

  taskItem.appendChild(checkbox);
  taskItem.appendChild(span);
  taskItem.appendChild(del);
  taskList.appendChild(taskItem);
}

function saveTasksToLocal() {
  const tasks = [];
  document.querySelectorAll(".taskItemclass").forEach((item) => {
    const text = item.querySelector(".tasktext").innerText;
    const isCompleted = item.classList.contains("completed");
    tasks.push({ text, completed: isCompleted });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

window.onload = function () {
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  storedTasks.forEach((task) => {
    addTask(task.text, task.completed);
  });
};
