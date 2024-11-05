
const formteatro = document.querySelector('#FormTeatro')

formteatro.addEventListener('submit', (e)=>{
    e.preventDefault()
    const nombre = document.querySelector('#nombre').value
    const ubicacion = document.querySelector('#opciones').value
    const funcion = document.querySelector('#obras').value    
    const cantidad = parseInt(document.querySelector('#cantidad').value, 10);
    const tpacientos =document.querySelector('#acientos').value
    const metdpago = document.querySelector('#pago').value
    const titular =document.querySelector('#titular').value
    const ntarjeta =document.querySelector('#ntarjeta').value
    
    let total = 0;
    let filaciento = [];
    let numeroaciento =[];
    
    
    for (let i = 0; i < cantidad; i++) {
        filaciento[i] = document.querySelector(`#filaciento${i + 1}`).value;
        numeroaciento[i] = document.querySelector(`#numeroaciento${i + 1}`).value;
    }
    
    if(tpacientos == 'Normal $15.5'){
        total = cantidad * 15.5;
    }else if(tpacientos == '3D $20'){
        total = cantidad * 20;
    }else if(tpacientos == '4DX $30'){
        total = cantidad * 30;
    }

    const Ticket = JSON.parse(localStorage.getItem('ticket')) || []

    const UserTicket = Ticket.find(tickets => tickets.nombre === nombre)
    if(UserTicket){
        return alert('El usuario ya esta registado!')
    }  

    Ticket.push({nombre: nombre, ubicacion: ubicacion, funcion: funcion, cantidad: cantidad, tpacientos: tpacientos, 
        filaciento: filaciento, numeroaciento: numeroaciento, metdpago: metdpago, titular:titular, ntarjeta: ntarjeta, total: total})
    localStorage.setItem('ticket', JSON.stringify(Ticket))
           
    alert('Pago Exitoso!')
    

    if (Ticket.length > 0) {
        let ticketData = '';   
        const usticket = Ticket[Ticket.length - 1];   
        ticketData += `Nombre: ${usticket.nombre}\n`;
        ticketData += `Ubicación: ${usticket.ubicacion}\n`;
        ticketData += `Función: ${usticket.funcion}\n`;
        ticketData += `Cantidad: ${usticket.cantidad}\n`;
        ticketData += `Sala: 2\n`;
        ticketData += `Tipo de Asientos: ${usticket.tpacientos}\n`;

        for(let i = 0; i < cantidad; i++){
            ticketData += `Asiento ${i+1}: ${usticket.filaciento[i]}, `;
            ticketData += `${usticket.numeroaciento[i]}\n`;
        }

        ticketData += `-------------------------------\n`;   
        ticketData += `Método de Pago: ${usticket.metdpago}\n`;
        ticketData += `Titular: ${usticket.titular}\n`;
        ticketData += `Total a Pagar: ${usticket.total}\n`;
        ticketData += `-------------------------------\n`;  
        
        const blob = new Blob([ticketData], { type: 'text/plain' });
    
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'tickets.txt'; 
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        } else {
            console.log('No hay tickets registrados.');
        }

        window.location.href = 'home.html'

    })


function convertToLowercase(input) {
    input.value = input.value.toLowerCase();
}

function FuncionesHorarios() {
    const select = document.getElementById('obras');   
    const ubicacion = document.getElementById('opciones').value;
    
    let opciones = [];

    if (ubicacion == 'Cinemark') {
        opciones = [
            { valor: 'DeadPool and Wolverine Lunes 20:00 +18', texto: 'DeadPool and Wolverine Lunes 20:00 +18' },
            { valor: 'Intensamente 2 Martes 18:00 Todo publico', texto: 'Intensamente Martes 18:00 Todo publico' },
            { valor: 'Un lugar en el Silencio Miercoles 16:00 +13', texto: 'Un lugar en el Silencio Miercoles 16:00 +13' }
        ];
    } else if (ubicacion == 'Cinepolis') {
        opciones = [
            { valor: 'Oppenheimer Lunes 19:00 +13', texto: 'Oppenheimer Lunes 19:00 +13' },
            { valor: 'Dune Martes 20:30 +13', texto: 'Dune Martes 20:30 +13' },
            { valor: 'Tenet Miércoles 21:00 +13', texto: 'Tenet Miércoles 21:00 +13' }
        ];
    } else if (ubicacion == 'Cinemex') {
        opciones = [
            { valor: 'The Batman Lunes 20:00 +13', texto: 'The Batman Lunes 20:00 +13' },
            { valor: 'Spider-Man: No Way Home Martes 18:00 +13', texto: 'Spider-Man: No Way Home Martes 18:00 +13' },
            { valor: 'Joker Miércoles 16:00 +18', texto: 'Joker Miércoles 16:00 +18' }
        ];
    }else if(ubicacion == 'AMC'){
        opciones = [
            { valor: 'Avatar Lunes 21:00 +13', texto: 'Avatar Lunes 21:00 +13' },
            { valor: 'Inception Martes 19:00 +13', texto: 'Inception Martes 19:00 +13' },
            { valor: 'The Matrix Miércoles 17:00 +13', texto: 'The Matrix Miércoles 17:00 +13' }
        ];
    }

    
    select.innerHTML = "";
    
    opciones.forEach(opcion => {
        const nuevaOpcion = new Option(opcion.texto, opcion.valor);
        select.add(nuevaOpcion);
    });
}

function Asignaracientos() {
 
    const contenedor = document.getElementsByClassName('AsignarAcientos')[0];   
    const lb = document.getElementById('lbseleccion');
    lb.style.display = 'block';
    contenedor.innerHTML = '';
    
    
    const cantidad = document.getElementById('cantidad').value;

 
    for (let i = 1; i <= cantidad; i++) {   
      
       
        const fila = document.createElement("input");
        fila.setAttribute("type", "text");
        fila.setAttribute("id", `filaciento${i}`);
        fila.setAttribute("name", `input${i}`);
        fila.setAttribute("placeholder", `Fila de Aciento ${i}`);
        fila.setAttribute("pattern", "[^\d]*");
        fila.setAttribute("title", "No se permiten números");
        fila.required = true;
        contenedor.appendChild(fila);

        const naciento = document.createElement("input");
        naciento.setAttribute("type", "number");
        naciento.setAttribute("id", `numeroaciento${i}`);        
        naciento.setAttribute("name", `input${i}`);
        naciento.setAttribute("placeholder", `N. de Aciento ${i}`);
        naciento.required = true;
        contenedor.appendChild(naciento);

       
    }
}

