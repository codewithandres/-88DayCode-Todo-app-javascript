const wrapper = document.querySelector('.wrapper'),
    backBtn = document.querySelector('.back-btn'),
    menuBrn = document.querySelector('.menu-btn'),
    addTaskFrom = document.querySelector('.add-task'),
    blackDrop = document.querySelector('.black-backdrop'),
    addButtonTask = document.querySelector('.add-task-button');

const toggleScreen = () => wrapper.classList.toggle('show-category');

const toggleButton = () => addButtonTask.classList.toggle('button--active');

const toggleAddTaskForm = () => {
    toggleButton();
    addTaskFrom.classList.toggle('active');
    blackDrop.classList.toggle('active');
};

addButtonTask.addEventListener('click', toggleAddTaskForm);

menuBrn.addEventListener('click', toggleScreen);

backBtn.addEventListener('click', toggleScreen);
