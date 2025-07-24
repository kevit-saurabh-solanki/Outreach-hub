
const url = 'http://localhost:3000/auth/login';
const submit = document.querySelector('#submit');
let data;
let dataSent;

submit.addEventListener('click', async (e) => {
    e.preventDefault();

    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

    document.querySelector('#username').value = "";
    document.querySelector('#password').value = "";

    if (username !== 'editor' || password !== 'editor') {
        alert('Invalid credentials');
        return;
    }

    dataSent = JSON.stringify({
        username: username,
        password: password
    });

    try {
        let response = await fetch(url, {
            method: 'POST',
            body: dataSent,
            headers: {
                "content-type": "application/json",
                "Authorization": "Bearer"
            }
        });
        if (response.ok) {
            data = await response.json();
            console.log(data);
            localStorage.setItem("token", data.access_token);
        }
    }
    catch (error) {
        console.log(error);
    }

    window.open('../user-page/home.html', '_blank');

});


