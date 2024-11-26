
const formteatro = document.querySelector('#FormTeatro')

formteatro.addEventListener('submit', (e)=>{
    e.preventDefault()
    const nombre = document.querySelector('#nombre').value
    const ubicacion = document.querySelector('#opciones').value
    const funcion = document.querySelector('#obras').value    
    const cantidad = document.querySelector('#cantidad').value
    const tpacientos =document.querySelector('#acientos').value
    const metdpago = document.querySelector('#pago').value
    const titular =document.querySelector('#titular').value
    const ntarjeta =document.querySelector('#ntarjeta').value
    const mtdpaypal = document.getElementById("mtdpaypal").value
    let total = 0;
    
    let filaciento = [];
    let numeroaciento =[];

    if(tpacientos == 'Luneta $15.5'){
        total = cantidad * 15.5;
    }else{
        total = cantidad * 20;
    }
    
    for (let i = 0; i < cantidad; i++) {
        filaciento[i] = document.querySelector(`#filaciento${i + 1}`).value;
        numeroaciento[i] = document.querySelector(`#numeroaciento${i + 1}`).value;
    }
    

    const Ticket = JSON.parse(localStorage.getItem('ticket')) || []

    const UserTicket = Ticket.find(tickets => tickets.nombre === nombre)
    if(UserTicket){
        return alert('El usuario ya esta registado!')
    }  

    
    if(metdpago == "Paypal"){
        Ticket.push({nombre: nombre, ubicacion: ubicacion, funcion: funcion, cantidad: cantidad, tpacientos: tpacientos, 
            filaciento: filaciento, numeroaciento: numeroaciento, metdpago: metdpago, titular:titular, mtdpaypal: mtdpaypal, total: total})
    }else{
        Ticket.push({nombre: nombre, ubicacion: ubicacion, funcion: funcion, cantidad: cantidad, tpacientos: tpacientos, 
            filaciento: filaciento, numeroaciento: numeroaciento, metdpago: metdpago, titular:titular, ntarjeta: ntarjeta, total: total})
    }
 


    localStorage.setItem('ticket', JSON.stringify(Ticket))
           
    alert('Pago Exitoso!')
    

    if (Ticket.length > 0) {
        let ticketData = '';   
        const usticket = Ticket[Ticket.length - 1];   
        ticketData += `Nombre: ${usticket.nombre}\n`;
        ticketData += `Ubicación: ${usticket.ubicacion}\n`;
        ticketData += `Función: ${usticket.funcion}\n`;
        ticketData += `Cantidad: ${usticket.cantidad}\n`;
        ticketData += `Tipo de Asientos: ${usticket.tpacientos}\n`;

        for(let i = 0; i < cantidad; i++){
            ticketData += `Asiento ${i+1}: ${usticket.filaciento[i]}, `;
            ticketData += `${usticket.numeroaciento[i]}\n`;
        }
        ticketData += `-------------------------------\n`;   
        ticketData += `Método de Pago: ${usticket.metdpago}\n`;
        ticketData += `Titular: ${usticket.titular}\n`;
        if(metdpago == "Paypal"){
            ticketData += `Cuenta de paypal: ${usticket.mtdpaypal}\n`;     
        }
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

    if (ubicacion == 'Teatro Colón Buenos Aires') {
        opciones = [
            { valor: 'Hamlet Lunes 20:00', texto: 'Hamlet Lunes 20:00' },
            { valor: 'Romeo y Julieta Martes 18:00', texto: 'Romeo y Julieta Martes 18:00' },
            { valor: 'La Casa de Bernarda Alba Miercoles 16:00', texto: 'La Casa de Bernarda Alba Miercoles 16:00' }
        ];
    } else if (ubicacion == 'Teatro de la Scala Milán') {
        opciones = [
            { valor: 'La Traviata Lunes 20:00', texto: 'La Traviata Lunes 20:00' },
            { valor: 'La Madama Butterfly Martes 18:00', texto: 'La Madama Butterfly Martes 18:00' },
            { valor: 'Don Carlo Miercoles 16:00', texto: 'Don Carlo Miercoles 16:00' }
        ];
    } else if (ubicacion == 'Teatro Metropólitan, Ciudad de México') {
        opciones = [
            { valor: 'Carmen Lunes 20:00', texto: 'Carmen Lunes 20:00' },
            { valor: 'El Fantasma de la Ópera Martes 18:00', texto: 'El Fantasma de la Ópera Martes 18:00' },
            { valor: 'La Boheme Miércoles 16:00', texto: 'La Boheme Miércoles 16:00' }
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


function pagos(){
    card = document.getElementById("metodpay");
    paypal = document.getElementById("Paypal");
    pago = document.getElementById("pago");
    card.style.display = "none";
    paypal.style.display = "none";
    if(pago.value == "Paypal"){
        card.style.display = "none";
        paypal.style.display = "block";
        paypal.style.width = "-webkit-fill-available";
    }else{
        paypal.style.display = "none";
        card.style.display = "block";
    }
}




document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("metodpay");

    form.addEventListener("submit", (event) => {
       
        event.preventDefault();

        
        const titular = document.getElementById("titular").value.trim();
        const ntarjeta = document.getElementById("ntarjeta").value.trim();
        const exdate = document.getElementById("exdate").value.trim();
        const cvv = document.getElementById("cvv").value.trim();

        
        const namePattern = /^[^\d]+$/; 
        const numberPattern = /^\d+$/; 
        const datePattern = /^(0[1-9]|1[0-2])\/\d{2}$/; 
        const cvvPattern = /^\d{3}$/; 

        let isValid = true;

        
        if (!namePattern.test(titular)) {
            alert("El nombre del titular no debe contener números.");
            isValid = false;
        }

        
        if (!numberPattern.test(ntarjeta)) {
            alert("El número de tarjeta debe contener solo dígitos.");
            isValid = false;
        }

        
        if (!datePattern.test(exdate)) {
            alert("La fecha de vencimiento debe estar en el formato MM/YY.");
            isValid = false;
        }

       
        if (!cvvPattern.test(cvv)) {
            alert("El CVV debe contener exactamente 3 dígitos.");
            isValid = false;
        }

        if (isValid) {
            alert("¡Formulario válido! Procesando datos...");
            
        }
    });
});
