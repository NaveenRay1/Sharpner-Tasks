"use strict";
let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
const taskName = document.getElementById("taskName");
const dueDate = document.getElementById("dueDate");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function displayTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task) => {
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            saveTasks();
            displayTasks();
        });
        const info = document.createElement("div");
        info.className = "task-info";
        if (task.completed) {
            info.classList.add("completed");
        }
        info.innerHTML = `
            <strong>${task.name}</strong><br>
            Due Date: ${task.dueDate}
        `;
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete";
        deleteBtn.addEventListener("click", () => {
            tasks = tasks.filter((item) => item.id !== task.id);
            saveTasks();
            displayTasks();
        });
        li.appendChild(checkbox);
        li.appendChild(info);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}
addBtn.addEventListener("click", () => {
    const name = taskName.value.trim();
    const date = dueDate.value;
    if (name === "" || date === "") {
        alert("Please enter task name and due date.");
        return;
    }
    const newTask = {
        id: Date.now(),
        name: name,
        dueDate: date,
        completed: false
    };
    tasks.push(newTask);
    saveTasks();
    displayTasks();
    taskName.value = "";
    dueDate.value = "";
});
displayTasks();
