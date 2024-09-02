
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
    
    if(tpacientos == 'Normal $15.5'){
        total = cantidad * 15.5;
    }else if(tpacientos == 'Vip $20'){
        total = cantidad * 20;
    }

    const Ticket = JSON.parse(localStorage.getItem('ticket')) || []

    const UserTicket = Ticket.find(tickets => tickets.nombre === nombre)
    if(UserTicket){
        return alert('El usuario ya esta registado!')
    }  

    Ticket.push({nombre: nombre, ubicacion: ubicacion, funcion: funcion, cantidad: cantidad, tpacientos: tpacientos, 
         metdpago: metdpago, titular:titular, ntarjeta: ntarjeta, total: total})
    localStorage.setItem('ticket', JSON.stringify(Ticket))
           
    alert('Pago Exitoso!')
    

    if (Ticket.length > 0) {
        let ticketData = '';   
        const usticket = Ticket[Ticket.length - 1];   
        ticketData += `Nombre: ${usticket.nombre}\n`;
        ticketData += `Ubicación: ${usticket.ubicacion}\n`;
        ticketData += `Horario: ${usticket.funcion}\n`;
        ticketData += `Cantidad: ${usticket.cantidad}\n`;       
        ticketData += `Tipo de Asientos: ${usticket.tpacientos}\n`;        

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

    if (ubicacion == 'Museo de Louvre París') {
        opciones = [
            { valor: 'Lunes 20:00', texto: 'Lunes 20:00' },
            { valor: 'Martes 18:00', texto: 'Martes 18:00 ' },
            { valor: 'Miercoles 16:00', texto: 'Miercoles 16:00' }
        ];
    }else if (ubicacion == 'Museo Metropolitano de Nueva York') {
        opciones = [
            { valor: 'Lunes 19:00', texto: 'Lunes 19:00' },
            { valor: 'Viernes 20:00', texto: 'Viernes 20:00' },            
            { valor: 'Domingo 19:00', texto: 'Domingo 19:00' }
        ];
    } else if (ubicacion == 'Museo Vaticano') {
        opciones = [            
            { valor: 'Viernes 21:00', texto: 'Viernes 21:00' },
            { valor: 'Sábado 17:00', texto: 'Sábado 17:00' },
            { valor: 'Domingo 18:30', texto: 'Domingo 18:30' }
        ];
    } else if (ubicacion == 'Museo Nacional de Antropología, Ciudad de México') {
        opciones = [
            
            { valor: 'Jueves 20:00', texto: 'Jueves 20:00' },            
            { valor: 'Sábado 18:30', texto: 'Sábado 18:30' },
            { valor: 'Domingo 16:00', texto: 'Domingo 16:00' }
        ];
    } else if (ubicacion == 'Museo Nacional Arte de Catalunya') {
        opciones = [
            { valor: 'Lunes 21:00', texto: 'Lunes 21:00' },            
            { valor: 'Miércoles 17:00', texto: 'Miércoles 17:00' },           
            { valor: 'Domingo 19:30', texto: 'Domingo 19:30' }
        ];
    }
        

    
    select.innerHTML = "";
    
    opciones.forEach(opcion => {
        const nuevaOpcion = new Option(opcion.texto, opcion.valor);
        select.add(nuevaOpcion);
    });
}



