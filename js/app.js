const wrapper = document.querySelector('.wrapper'),
    menuBrn = document.querySelector('.menu-btn');

const toggleScreen = () => wrapper.classList.toggle('show-category');

menuBrn.addEventListener('click', toggleScreen);
