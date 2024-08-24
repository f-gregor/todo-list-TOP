class Todo {
    constructor(title, description, dueDate, priority, project) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
    }
}

class Project {
    constructor(name, color) {
        this.name = name;
        this.color = color;
    }
}

export {Todo, Project};

// let a = new Todo("Prova", "Prova per vedere se funziona", "12/07/2024", 2);
// let b = new Todo("Prova 2", "Prova 2 per vedere se funziona", "18/07/2024", 0);
// console.log(a, b);

// let p1 = new Project("Default", "#000000");
// let p2 = new Project("Fitness", "#ffffff");
// console.log(p1,p2);

// a.assignProject(p1);
// console.log(p1);

// b.assignProject(p1);
// console.log(p1);

// a.delete();

// console.log(p1);

// let c = new Todo("Prova 3", "Prova per vedere se funziona", "12/07/2024", 1);

// c.assignProject(p2);

// console.log(p1, p2);

// c.changeProject(p1);

// console.log(p1, p2);
