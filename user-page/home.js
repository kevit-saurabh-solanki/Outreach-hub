const signout = document.querySelector('.signout');

signout.addEventListener('click', () => {

    let alertVal = confirm("Do you want to logout");

    if (alertVal) {
        localStorage.removeItem("token");
        window.open('../login-page/login.html', '_blank');
    }

})