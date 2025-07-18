const fullName = document.querySelector('#full-name');
const email = document.querySelector('#email');
const password = document.querySelector('#pass');
const confPass = document.querySelector('#conf-pass');
const url = 'https://687a0cceabb83744b7eb2ab8.mockapi.io/Login';
const btn = document.querySelector('.signup-btn')

// if (fullName.value < 'a' && fullName.value > 'z' || fullName.value < 'A' && fullName.value > 'Z') {

// }




async function sendData() {
    try {
        let response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                username: fullName.value,
                email: email.value,
                password: password.value,
            }),
            headers: {
                'content-type': 'application/json'
            }
        });
        if (response.ok) {
            const jsonRes = await response.json();
        }

    }

    catch (error) {
        console.log(error);
    }
}

btn.addEventListener('click', (e) => {
    // if (password.value !== confPass.value) {
    //     alert('password and confirm password are not same');
    //     return;
    // }
    e.preventDefault();
    sendData();
});