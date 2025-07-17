const label = document.querySelectorAll('label');
const input = document.querySelectorAll('input');

for (let i = 0; i < label.length; i++) {

    label[i].addEventListener('click', () => {
        console.log(input[i]);
        input[i].style.color = 'red';
    })
}