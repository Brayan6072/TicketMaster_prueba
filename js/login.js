const loginForm = document.querySelector('#loginForm')
loginForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const email = document.querySelector('#email').value   
    const username = document.querySelector('#user').value
    const password = document.querySelector('#password').value


    if(username.length < 4 || username.length > 10 ){
        alert('Solo se aceptan de 4-10 caracteres');
    }
    
    if(password.length != 8){
        alert('La contraseña debe ser de 8 carateres');
    }

    const Users = JSON.parse(localStorage.getItem('users')) || []
    const validUser = Users.find(user => user.username == username && user.email === email && user.password === password)

    if(!validUser){
        return alert('Usuario y/o contraseña incorrectos!')
    }
    alert(`Bienvenido ${validUser.username}`)
    localStorage.setItem('login_success', JSON.stringify(validUser))
    window.location.href = 'home.html'   


})


function validateInput() {
    var password = document.getElementById('password').value;
    var input=  document.getElementById('user').value;
    const especial = /[!@#\$%\^\&*\)\(+=._-]/;
    
    if (input[0] === input[0].toLowerCase() && isNaN(input[0])) {
        alert("El usuario no puede comenzar con una letra minúscula.");       
    }
   
    
    if (especial.test(input[0])) {
        alert("El usuario no puede iniciar con un carácter especial");
        
    }

    for(let i = 1 ; i < password.length -1; i++ ){
        if(especial.test(password[i])){
            alert('No se permiten caracteres especiales en medio de la contraseña');
        }        
    }
    
    for(let i = 0; i < input.length ; i++){
        if (input[i] === " ") {
            alert("No se aceptan espacios");
            return false;
        }
    }

    
}
