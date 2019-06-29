const loginService = new LoginService();

if(loginService.isLogged()) {
    onLogged();
}

const f = document.getElementById('loginform');
f.onsubmit = (e) => {
    e.preventDefault(); // disable the auto page refresh when subbmitting a form.
    const data = new FormData(f);
    const email = data.get('email');
    loginService.login(email);
    onLogged()
    return false;
}


function onLogged() {
    window.location.replace('todo.html');
}