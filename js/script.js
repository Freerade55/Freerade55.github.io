
const hamburger = document.querySelector('.hamburger'),
    menu = document.querySelector('.menu'),
    closeElem = document.querySelector('.menu__close')

hamburger.addEventListener('click', () => {
    menu.classList.add('active');

});

closeElem.addEventListener('click', () => {
    menu.classList.remove('active');

});


const counters = document.querySelectorAll('.tech-use__number'),
    lines = document.querySelectorAll('.percent-skills__filling');


counters.forEach((item, i) => {
    lines[i].style.width = item.innerHTML;

})












