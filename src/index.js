import "./style.css";
import {Project, Todo} from "./data-structures";

function loadData() {
    let todos, projects;

    if (localStorage.getItem("TODOS") && localStorage.getItem("PROJECTS")) {
        todos = JSON.parse(localStorage.getItem("TODOS"));
        projects = JSON.parse(localStorage.getItem("PROJECTS"));
    }
    else {
        todos = [];
        projects = [];
        projects.push(new Project("Default", "#666666"));
    }

    return [todos, projects];
}

function saveData() {
    localStorage.setItem("TODOS", JSON.stringify(TODOS));
    localStorage.setItem("PROJECTS", JSON.stringify(PROJECTS));
}

function delete_todo(todo) {
    const index = TODOS.indexOf(todo);
    if (index > -1) TODOS.splice(index, 1);
    saveData()
}
// Display functions 

function generateProjectOptions(projectList) {
    const select = document.querySelector("#projects");
    select.innerHTML = "";

    for(let i = 0; i < projectList.length; i++) {
        const opt = document.createElement("option");
        opt.value = i;
        opt.textContent = projectList[i].name;
        select.appendChild(opt);
    }
}

function generateProjectList(projectList) {
    const list = document.querySelector(".project-container");
    list.innerHTML = "";

    for(let i = 0; i < projectList.length; i++) {
        const project = document.createElement("li");
        project.value = i;
        project.style.color = projectList[i].color;
        project.textContent = projectList[i].name;

        project.addEventListener("click", (e) => {
            displayTodos(TODOS.filter((todo) => {
                return todo.project === PROJECTS[Number(e.target.value)];
            }));
        });
        list.appendChild(project);
    }

    const project = document.createElement("li");
    project.value = -1;
    project.textContent = "See all"
    project.addEventListener("click", () => {displayTodos(TODOS)});
    list.appendChild(project);
}

function displayTodos(list) {
    const todo_container = document.querySelector(".todo-container");
    todo_container.innerHTML = "";

    for(let i = 0; i < list.length; i++) {
        const todo = list[i];
        const container = document.createElement("div");
        const flag = document.createElement("input");
        const title = document.createElement("h4");
        const description = document.createElement("p");
        const dueDate = document.createElement("p");
        const project = document.createElement("p");
        
        container.classList.add("todo-entry");
        container.value = i
        flag["type"] = "radio";

        switch (todo.priority) {
            case "0":
                flag.classList.add("low");
                break;
            case "1":
                flag.classList.add("medium");
                break;
            case "2":
                flag.classList.add("high");
                break;
            default:
                break;
        }

        // Handle flagging event
        flag.addEventListener("click", (e) => {
            const index = Number(e.target.parentNode.value);
            delete_todo(list[index]);
            displayTodos(TODOS);
        })

        title.textContent = todo.title;
        dueDate.classList.add("duedate");
        dueDate.textContent = todo.dueDate;
        project.classList.add("project");
        project.textContent = "#" + todo.project.name;
        project.style.color = todo.project.color;
        description.classList.add("description");
        description.textContent = todo.description;
        container.append(flag);
        container.appendChild(title);
        container.appendChild(dueDate);
        container.appendChild(project);
        container.appendChild(description);

        todo_container.appendChild(container);
    }
}

// Todo creation handling
const showTodoDialog = document.querySelector("button.todo");
const todoDialog = document.querySelector("#todo");
const todoForm = document.querySelector("#todo>form");

showTodoDialog.addEventListener("click", () => {
    todoDialog.showModal();
});

document.querySelector("#todo button.closeButton").addEventListener("click", () => {
    todoDialog.close()
})

todoForm.addEventListener('submit', (e) => {
    const formData = new FormData(e.target);

    TODOS.push(new Todo(formData.get('title'),
                        formData.get('description'),
                        formData.get('due-date'),
                        formData.get('priority'),
                        PROJECTS[Number(formData.get('projects'))]));

    displayTodos(TODOS);
    saveData();
})

// Project creation handing

const showProjectDialog = document.querySelector("button.project");
const projectDialog = document.querySelector("#project");
const projectForm = document.querySelector("#project>form");

showProjectDialog.addEventListener("click", () => {
    projectDialog.showModal();
});

document.querySelector("#project button.closeButton").addEventListener("click", () => {
    projectDialog.close()
})

projectForm.addEventListener('submit', (e) => {
    const formData = new FormData(e.target);

    PROJECTS.push(new Project(formData.get('name'),
                              formData.get('color')));

    generateProjectOptions(PROJECTS);
    generateProjectList(PROJECTS);
    saveData();
});

// Program running
const [TODOS, PROJECTS] = loadData();
generateProjectOptions(PROJECTS);
generateProjectList(PROJECTS);
displayTodos(TODOS);