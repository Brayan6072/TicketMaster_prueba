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
