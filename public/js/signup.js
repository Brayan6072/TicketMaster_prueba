const signupForm = document.querySelector('#signupForm')
signupForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const name = document.querySelector('#name').value
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value  

    
    
    
    if(validateInput()){
        const Users = JSON.parse(localStorage.getItem('users')) || []
        const isUserRegistered = Users.find(user => user.email === email && user.username == name)
        if(isUserRegistered){
            return alert('El usuario ya esta registado!')
        }
        Users.push({username: name, email: email, password: password})
        localStorage.setItem('users', JSON.stringify(Users))
        alert('Registro Exitoso!')
        window.location.href = 'login.html'
    }
    

})

function validateInput() {
    let validacion = 0;
    var password = document.getElementById('password').value;
    var nombre =  document.getElementById('name').value;
    const especial = /[!@#\$%\^\&*\)\(+=._-]/;
    

    if(nombre.length < 4 ){
        alert('No se aceptan menos de 4 caracteres en el usuario'); validacion++; }

    

    if(password.length != 8){
        alert('La contraseña debe ser de 8 carateres');
        validacion++;
    }

    for(let i = 0; i < nombre.length; i++){
        if (nombre[i] === " ") {
            alert("No se aceptan espacios");
            validacion++  
        }
    }


    if (nombre[0] === nombre[0].toLowerCase() && isNaN(nombre[0])) {
        alert("El usuario no puede comenzar con una letra minúscula.");   
        validacion++; 
    }
   
    
    if (especial.test(nombre[0])) {
        alert("El usuario no puede iniciar con un carácter especial");
        validacion++;
    }

    for(let i = 1 ; i < password.length -1; i++ ){
        if(especial.test(password[i])){
            alert('No se permiten caracteres especiales en medio de la contraseña');
            validacion++;
            
        }  
              
    }
    
    return validacion === 0;
    
}
