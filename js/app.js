import { categories, tasks } from './DB/database.js';
import { ButtonDelete } from './templete/TempleteBottonDelete.js';
import { TempleteCategory } from './templete/templeteCategory.js';
import { CheckMark } from './templete/templeteCheckmark.js';

const wrapper = document.querySelector('.wrapper'),
    backBtn = document.querySelector('.back-btn'),
    menuBrn = document.querySelector('.menu-btn'),
    addTaskFrom = document.querySelector('.add-task'),
    blackDrop = document.querySelector('.black-backdrop'),
    addButtonTask = document.querySelector('.add-task-button'),
    categoryImg = document.querySelector('#categort-img');

let selectedCategory = categories.at(0);

const toggleScreen = () => wrapper.classList.toggle('show-category');

const toggleButton = () => addButtonTask.classList.toggle('button--active');

const toggleAddTaskForm = () => {
    addTaskFrom.classList.toggle('active');
    blackDrop.classList.toggle('active');
    toggleButton();
};

addButtonTask.addEventListener('click', toggleAddTaskForm);

menuBrn.addEventListener('click', toggleScreen);

backBtn.addEventListener('click', toggleScreen);

//* lets Add category and tasks with JS

const filterCategory = category => {
    return tasks.filter(
        task =>
            task.category.toLocaleLowerCase() ===
            category.title.toLocaleLowerCase()
    );
};

const categoriesContainer = document.querySelector('.categories'),
    categoryTitle = document.querySelector('.category--title'),
    TotalCategoryTask = document.querySelector('.category--task'),
    totalTask = document.querySelector('.totalTask');

const calculateTotal = () => {
    const categoryTask = tasks.filter(
        task =>
            task.category.toLocaleLowerCase() ===
            selectedCategory.title.toLocaleLowerCase()
    );

    TotalCategoryTask.textContent = `${categoryTask.length} Tasks`;
    totalTask.textContent = tasks.length;
};

const showSelectedCategory = category => {
    selectedCategory = category;

    const { title, img } = category;

    categoryTitle.textContent = title;
    categoryImg.setAttribute('src', `assets/${img}`);

    toggleScreen();
    calculateTotal();
    renderTasks();
};

const renderCategory = () => {
    categoriesContainer.innerHTML = '';

    //*Get All the Task of current category
    categories.map(category => {
        const categoryTask = filterCategory(category);
        const div = document.createElement('div');

        div.classList.add('category');
        div.innerHTML = TempleteCategory(category, categoryTask);
        div.addEventListener('click', () => showSelectedCategory(category));

        categoriesContainer.appendChild(div);
    });
};

const taskContainer = document.querySelector('.tasks');

const renderTasks = () => {
    taskContainer.innerHTML = '';

    const categoryTask = tasks.filter(
        task =>
            task.category.toLocaleLowerCase() ===
            selectedCategory.title.toLocaleLowerCase()
    );

    //* if no task found
    if (categoryTask.length === 0)
        taskContainer.innerHTML = ` <p class="not-taks"> NO task for this category </p>`;

    categoryTask.map(task => {
        const div = document.createElement('div');
        div.classList.add('task');

        const label = document.createElement('label');
        label.classList.add('task');
        label.setAttribute('for', task.id);

        const checbox = document.createElement('input');
        checbox.setAttribute('type', 'checkbox');
        checbox.setAttribute('id', task.id);
        checbox.checked = task.completed;

        //* add completion functionallity on click checkbox

        checbox.addEventListener('change', () => {
            const index = tasks.findIndex(t => t.id === task.id);

            //* change the completed value of the task
            tasks[index].completed = !tasks[index].completed;

            //*save the changes in local storage
            saveLocal();
        });

        div.innerHTML = ButtonDelete();

        label.innerHTML = CheckMark(task);

        label.prepend(checbox);
        div.prepend(label);

        taskContainer.appendChild(div);

        const deleteButton = div.querySelector('.delete');
        deleteButton.addEventListener('click', () => {
            const index = tasks.findIndex(t => t.id === task.id);
            tasks.splice(index, 1);

            saveLocal();
            renderTasks();
        });
    });
    renderCategory();
    calculateTotal();
};

// * save and get data from local storage
const saveLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const getLocal = () => {
    let localTasks = JSON.parse(localStorage.getItem('tasks'));
    if (!localTasks) return;
    tasks.splice(0, tasks.length, ...localTasks);
};

// TODO: lets ads Funcionality to ad new tasks
const categorySelect = document.querySelector('#category-select');
categories.map(category => {
    const options = document.createElement('option');

    options.value = category.title.toLowerCase();
    options.textContent = category.title;

    categorySelect.appendChild(options);
});

//* These all local are already stored tasks
getLocal();
calculateTotal();
renderTasks();
