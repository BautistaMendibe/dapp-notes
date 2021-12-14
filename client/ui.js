const taskForm = document.querySelector("#taskForm");

document.addEventListener("DOMContentLoaded", () => {
    App.init();
});

taskForm.addEventListener("submit", e => {
    e.preventDefault();
    window.App.createTask(taskForm["title"].value, taskForm["description"].value);
});