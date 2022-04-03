Swal.fire({
    title: 'Bienvenido a Sendbox',
    text: 'A continuacion realize su propio presupuesto',
    imageUrl: './img/sendbox.png',
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: 'Custom image',
}) 

// Objeto
  
const posiblesEnvios = [
    {id: 1, origen: "Cordoba", destino: "Buenos Aires", precio1: 635, precio2: 909},
    {id: 2, origen: "Cordoba", destino: "Mendoza", precio1: 635, precio2: 909},
    {id: 3, origen: "Cordoba", destino: "Rosario", precio1: 478, precio2: 776},
    {id: 4, origen: "Cordoba", destino: "San Luis", precio1: 452, precio2: 678},
    {id: 5, origen: "Cordoba", destino: "Santa Fe", precio1: 635, precio2: 893},
    {id: 6, origen: "Buenos Aires", destino: "Mendoza", precio1: 659, precio2: 959},
    {id: 7, origen: "Buenos Aires", destino: "Rosario", precio1: 635, precio2: 909},
    {id: 8, origen: "Buenos Aires", destino: "San Luis", precio1: 635, precio2: 909},
    {id: 9, origen: "Buenos Aires", destino: "Santa Fe", precio1: 635, precio2: 909},
    {id: 10, origen: "Mendoza", destino: "Rosario", precio1: 635, precio2: 909},
    {id: 11, origen: "Mendoza", destino: "San Luis", precio1: 416, precio2: 678},
    {id: 12, origen: "Mendoza", destino: "Santa Fe", precio1: 704, precio2: 1009},
    {id: 13, origen: "Rosario", destino: "San Luis", precio1: 635, precio2: 909},
    {id: 14, origen: "Rosario", destino: "Santa Fe", precio1: 465, precio2: 827},
    {id: 15, origen: "San Luis", destino: "Santa Fe", precio1: 704, precio2: 1009} 
];

const CONSTANTE = 5000;
const lista = document.querySelector(".destinos");
const formulario = document.querySelector("#formulario");
formulario.addEventListener('submit', enviarPresupuesto);

function cotizarPresupuesto() {
    const origen0=document.querySelector("#origen").value;
    const destino0=document.querySelector("#destino").value;
    const largo=document.querySelector("#largo").value;
    const ancho=document.querySelector("#ancho").value;
    const alto=document.querySelector("#alto").value;
    const excedente = 25;
        return {origen0, destino0, largo, ancho, alto, excedente};
    
}


function enviarPresupuesto(e) {
    resultado.innerHTML = "";
    e.preventDefault();
    
    const {origen0, destino0, largo, ancho, alto, excedente } = cotizarPresupuesto();
    
    const aforo = (parseInt(largo) * parseInt(ancho) * parseInt(alto))/CONSTANTE
    let precio  ;

    posiblesEnvios.forEach(envio=>{

        if (aforo <= 6 && envio.origen === origen0 && envio.destino=== destino0   ) {
           return precio = 635;
        } else if (7<= aforo <= 21 && envio.origen=== origen0 && envio.destino=== destino0) {
           return precio = 909;
        }  
    })
    
    if (22<= aforo) {
        precio = 909 +((aforo-21)*excedente);
    }

    mostrar(origen0, destino0, aforo, precio)
}


function mostrar(origen0, destino0, aforo, precio) {
    const resultado = document.querySelector('#resultado');
    const info = document.createElement('div');

    info.innerHTML = `
        <div class="listado" 
            <div class="listado">
                <p>El origen de su envio es: ${origen0} </p>
            </div>
            <div class="listado">
                <p>El destino de su envio es: ${destino0} </p>
            </div>
            <div class="listado">
                <p>Por aforo el peso del paquete es de: ${aforo} kg </p>
            </div>
            <div class="listado">
                <p>El precio a abonar es de: $ ${precio} </p>
            </div>
            <div class="listado">
                <p> Todas las tarifas corresponden solamente al servicio de flete, no icluyen ni entrega a domicilio, ni IVA. </p>
            </div>
        </div>
    `
    
    resultado.appendChild(info);
        
    reset();
}

function reset() {
    document.querySelector("#formulario").reset();
}


// Fetch

fetch("/data.json")
    .then((res) => res.json ())
    .then((data) => {
        
        data.forEach((destinos) => {
            const divDestinos = document.createElement("div");
            divDestinos.innerHTML = `
                <ul class="lista"> 
                    <li>${destinos.nombre}</li>
                </ul>
            `;
            
            lista.append(divDestinos);

        });
            
    })
