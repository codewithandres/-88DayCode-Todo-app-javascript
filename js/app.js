import { categories, tasks } from './DB/database.js';
import { TempleteCategory } from './templete/templeteCategory.js';

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

/*
 * lets Add category and tasks with JS
 */

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
};

const renderCategory = () => {
    categoriesContainer.innerHTML = '';

    /*
     *Get All the Task of current category
     */
    categories.map(category => {
        const categoryTask = filterCategory(category);
        const div = document.createElement('div');

        div.classList.add('category');
        div.innerHTML = TempleteCategory(category, categoryTask);
        div.addEventListener('click', () => showSelectedCategory(category));

        categoriesContainer.appendChild(div);
    });
};

calculateTotal();

renderCategory();
