const addBtn = document.querySelector('.add-contact-btn');
const formBox = document.querySelector('.contact-form-box')

addBtn.addEventListener('click', () => {
    formBox.classList.add('contact-form-visible');
})