
const url = 'https://687a0cceabb83744b7eb2ab8.mockapi.io/Login';
const submit = document.querySelector('#submit');
let data;

async function fetchData() {
    try {
        let response = await fetch(url);
        if (response.ok) {
            data = await response.json();
        }
    }
    catch (error) {
        console.log(error);
    }

    // Event listener after data is fetched
    submit.addEventListener('click', (e) => {
        e.preventDefault();

        const username = document.querySelector('#username').value.trim();
        const password = document.querySelector('#pass').value.trim();

        for (let i = 0; i < data.length; i++) {
            if (data[i].username === username && data[i].password === password) {
                console.log('ok');
                window.location.href = '../user-page/home.html';
                return;
            }
        }

        console.log('Invalid credentials');
        alert('Invalid username or password!');
    });
}

fetchData();

