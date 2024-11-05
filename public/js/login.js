const loginForm = document.querySelector('#loginForm');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.querySelector('#email').value;
    const username = document.querySelector('#user').value;
    const password = document.querySelector('#password').value;
    
    const validator = new Validator();
    validator.validateUsername(username);
    validator.validatePassword(password);

    if (validator.hasErrors()) {
        const errors = validator.getErrors();
        errors.forEach(error => {
            alert(error);  
        });
        return;
    }

    
    const Users = JSON.parse(localStorage.getItem('users')) || [];
    const validUser = Users.find(user => user.username == username && user.email === email && user.password === password);

    if (!validUser) {
        return alert('Usuario y/o contraseña incorrectos!');
    }

    alert(`Bienvenido ${validUser.username}`);
    
    localStorage.setItem('login_success', JSON.stringify(validUser));
    window.location.href = 'home.html';
});



class Validator {
    constructor() {
        this.errors = [];
    }

    addError(message) {
        this.errors.push(message);
    }

    validateUsername(username) {
        const especial = /[!@#\$%\^\&*\)\(+=._-]/;

        if (username.length < 4 || username.length > 10) {
            this.addError('El nombre de usuario debe tener entre 4 y 10 caracteres.');
        }

        if (username[0] === username[0].toLowerCase() && isNaN(username[0])) {
            this.addError('El nombre de usuario no puede comenzar con una letra minúscula.');
        }

        if (especial.test(username[0])) {
            this.addError('El nombre de usuario no puede comenzar con un carácter especial.');
        }

        if (username.includes(" ")) {
            this.addError('El nombre de usuario no puede contener espacios.');
        }
    }

    validatePassword(password) {
        const especial = /[!@#\$%\^\&*\)\(+=._-]/;

        if (password.length !== 8) {
            this.addError('La contraseña debe tener 8 caracteres.');
        }

        for (let i = 1; i < password.length - 1; i++) {
            if (especial.test(password[i])) {
                this.addError('No se permiten caracteres especiales en medio de la contraseña.');
            }
        }
    }

    hasErrors() {
        return this.errors.length > 0;
    }

    getErrors() {
        return this.errors;
    }
}



