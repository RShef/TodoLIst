class LoginService {
    constructor() {
        this.email = sessionStorage.getItem('email');
    }
    
    isLogged() {
        return this.email != null;
    }
    
    login(email) {
        sessionStorage.setItem('email', email);
    }
    
    logout() {
        sessionStorage.removeItem('email');
    }
}