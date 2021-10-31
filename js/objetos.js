let rutinaTotal = [];
let fecha = new Date();
console.clear();

//funcion para insertar los datos dentro de un objeto
function insertarDatos(dia, nombre){
    const verificarRutina = rutinaTotal.some(obj => obj.dia === dia)
    if(!verificarRutina){
        rutinas = { dia, nombre}      
        rutinaTotal = [...rutinaTotal,rutinas];
    }else{
        console.log("Solo puedes registrar 1 rutina por día")
    }
}

let dia;
//metodo para consultar el dia de la semana
const dias= ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
const diaSemana = dias[fecha.getDay()];//obtiene el dia
const verDia = rutinaTotal.some(obj => obj.dia.toLowerCase() === dia);
//.
const rutine = rutinaTotal.filter( x => x.dia.toLowerCase() === dia);
//const rutinaDia = rutinas.dia;
//const rutinaNombre = rutinas.nombre;

document.addEventListener('DOMContentLoaded', obtenerRutina);

async function obtenerRutina(){
    const url = 'rutina.json';
    try{
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        crearRutina(datos);
        siguienteRutina(datos);
    }catch(error){
        console.log(error);
    }
}

function oscuroClaro(){
    const oscuro = document.querySelector('.oscuro');
    const claro = document.querySelector('.claro');
    const body =  document.body;
    const navbar = document.querySelector('.navbar');

    

    if(oscuro){
        oscuro.innerHTML = '<i class="fas fa-moon"></i>';
        oscuro.classList.add('claro');
        oscuro.classList.remove('oscuro');
        body.classList.add('bg-claro');
        navbar.classList.add('bg-light', 'navbar-light');
        navbar.classList.remove('bg-dark', 'navbar-dark');

    }else if(claro){
        claro.innerHTML = '<i class="fas fa-sun"></i>';
        claro.classList.add('oscuro');
        claro.classList.remove('claro');
        body.classList.add('bg-oscuro');
        body.classList.remove('bg-claro');
        navbar.classList.add('bg-dark', 'navbar-dark');
        navbar.classList.remove('bg-light', 'navbar-light');
    }
}

function crearRutina(rutinas){
    const rutinaDia = rutinas.filter( x => x.dia.toLowerCase() === diaSemana)
    const {dia, nombre, ejercicios} = rutinaDia[0];

    if(nombre === 'descanso'){
        const diaRutina = document.querySelector('.nombre-dia');
        const nombreRutina = document.querySelector('.nombre-ejercicio');
        diaRutina.textContent = dia;
        nombreRutina.textContent = nombre;
    }else{
        const diaRutina = document.querySelector('.nombre-dia');
        const nombreRutina = document.querySelector('.nombre-ejercicio');
        diaRutina.textContent = dia;
        nombreRutina.textContent = nombre;

        let html = '';
        const rutinaDiv = document.querySelector('.rutina');

        //crear el div
        ejercicios.map(  ejercicio => {
            const {nombre,series,repeticiones,tiempoDescanso,peso} = ejercicio;
            html += `
                <div class="ejercicios">
                    <ul class="ejercicio">
                        <li class="lista">
                            <p class="p-titulo">Ejercicio: </p> 
                            <p class="p-contenido">${nombre}</p>
                        </li>
                        <li class="lista">
                            <p class="p-titulo">Series: </p> 
                            <p class="p-contenido">${series}</p>
                        </li>
                        <li class="lista">
                            <p class="p-titulo">Repeticiones: </p> 
                            <p class="p-contenido">${repeticiones}</p>
                        </li>
                        <li class="lista">
                            <p class="p-titulo">Descanso: </p> 
                            <p class="p-contenido">${tiempoDescanso}</p>
                        </li>
                        <li class="lista">
                            <p class="p-titulo">Peso: </p> 
                            <p class="p-contenido">${peso}</p>
                        </li>
                    </ul>
                </div>
            `;

            rutinaDiv.innerHTML = html;
        });
    }
}

let rutinaActual = 1;

function siguienteRutina(datos){
    const btnSiguiente = document.querySelector('.siguiente');
    const pEjercicio = document.querySelector('.ejercicio-texto');
    const pSerie = document.querySelector('.serie-texto');
    const contador = document.querySelector('.contador');
    
    const {ejercicios} = datos[fecha.getDay()-1];
    const rutinaDiaa = ejercicios.map(ejer=>ejer.series);

    let f = ejercicios.length;
    let i = 0;
    
    pEjercicio.textContent = `${ejercicios[i].nombre}`;
    pSerie.textContent = `${rutinaActual}`;

    btnSiguiente.addEventListener('click', ()=>{
        rutinaActual++;
        console.log(rutinaActual)
        pSerie.textContent = `${rutinaActual}`;
        if(rutinaActual==rutinaDiaa[i]){
            rutinaActual=0;
            i++;
            if(i+1<=f){
                console.log(`serie: ${rutinaActual} - ejercicio:${ejercicios[i].nombre}`);
                pEjercicio.textContent = `${ejercicios[i].nombre}`;
            }else{
                console.log('Rutina terminada');
                contador.classList.add('none')
                btnSiguiente.disabled = true;
            }
        }
    });
}
let suma=0;
function estadoReloj(){
    let iniciado = true;
    
    const iniciaBtn = document.querySelector('.btn-outline-success');
    const detenerBtn = document.querySelector('.btn-outline-danger');
    if(iniciaBtn){
        iniciaBtn.classList.remove('btn-outline-success');
        iniciaBtn.classList.add('btn-outline-danger');
        iniciaBtn.textContent = 'Detener';
        reloj();
    }else if(detenerBtn){
        detenerBtn.classList.add('btn-outline-success');
        detenerBtn.classList.remove('btn-outline-danger');
        detenerBtn.textContent = 'Iniciar';
        parar();
    }
}
let tiempo;
function reloj(){
    tiempo = setInterval(ImprimirReloj, 1000);
}

function parar(){
    clearInterval(tiempo);
}

const pCronometro = document.querySelector('.cronometro');
let s = 0;
let m = 0;

function reiniciarReloj(){
    sr = '00',mr = '00';
    s=0,m=0;
    pCronometro.textContent = `${mr}:${sr}`;
}

function ImprimirReloj(){
    s++;
    if(s<10){sr = `0${s}`;}else{sr=s}
    if(m<10){mr = `0${m}`;}else{mr=m}

    if(s===59){m++;s=0;}
    if(m===59){h++;m=0;}

    pCronometro.textContent = `${mr}:${sr}`;
}




