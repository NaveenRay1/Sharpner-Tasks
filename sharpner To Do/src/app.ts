interface Task {
    id: number;
    name: string;
    dueDate: string;
    completed: boolean;
}

let tasks: Task[] = JSON.parse(
    localStorage.getItem("tasks") || "[]"
);

const taskName = document.getElementById("taskName") as HTMLInputElement;
const dueDate = document.getElementById("dueDate") as HTMLInputElement;
const addBtn = document.getElementById("addBtn") as HTMLButtonElement;
const taskList = document.getElementById("taskList") as HTMLUListElement;

function saveTasks(): void {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks(): void {
    taskList.innerHTML = "";

    tasks.forEach((task: Task) => {
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
            tasks = tasks.filter((item: Task) => item.id !== task.id);
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
    const name: string = taskName.value.trim();
    const date: string = dueDate.value;

    if (name === "" || date === "") {
        alert("Please enter task name and due date.");
        return;
    }

    const newTask: Task = {
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