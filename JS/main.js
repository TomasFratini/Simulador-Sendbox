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

// Variables

const CONSTANTE= 5000;
const PEXCEDENTE = 25;
const lista = document.querySelector(".destinos")

const formulario = document.querySelector("#formulario");
formulario.addEventListener('submit', enviarPresupuesto);


// Funciones

function getValues() {
    const origen = document.querySelector('#origen').value;
    const destino = document.querySelector('#destino').value;
    const largo = document.querySelector('#largo').value;
    const ancho = document.querySelector('#ancho').value;
    const alto = document.querySelector('#alto').value;

    return {origen, destino, largo, ancho, alto};
}

function enviarPresupuesto(e) {
    resultado.innerHTML = "";
    e.preventDefault();

    const {origen, destino, largo, ancho, alto} = getValues();

    const aforo = (parseInt(largo) * parseInt(ancho) * parseInt(alto))/CONSTANTE;
    const precio = aforo * PEXCEDENTE;

    mostrar(origen, destino, aforo, precio);
}

function mostrar(origen, destino, aforo, precio) {
    const resultado = document.querySelector('#resultado');
    const info = document.createElement('div');

    info.innerHTML = `
        <div class="listado" 
            <div class="listado">
                <p>El origen de su envio es: ${origen} </p>
            </div>
            <div class="listado">
                <p>El destino de su envio es: ${destino} </p>
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
            const divDestinos = document.createElement("div")
            divDestinos.classList.add('listado-destinos');
            divDestinos.innerHTML = `
                <ul class="lista"> 
                    <li>${destinos.nombre}</li>
                </ul>
            `
            
            lista.append(divDestinos)

        })
            
    })

// Eventos



// localStorage

const guardarLocal = (clave, valor) => {localStorage.setItem(clave, valor);

};

guardarLocal("posiblesDestinos", JSON.stringify(posiblesEnvios));

// Pruebas

const OrigenCordoba = posiblesEnvios.filter(posiblesEnvios => posiblesEnvios.origen == "Cordoba");

const OrigenBuenosAires = posiblesEnvios.filter(posiblesEnvios => posiblesEnvios.origen == "Buenos Aires");

const OrigenMendoza = posiblesEnvios.filter(posiblesEnvios => posiblesEnvios.origen == "Mendoza");

const OrigenRosario = posiblesEnvios.filter(posiblesEnvios => posiblesEnvios.origen == "Rosario");

const OrigenSanLuis = posiblesEnvios.filter(posiblesEnvios => posiblesEnvios.origen == "San Luis");

const DestinoBuenosAires = posiblesEnvios.filter(posiblesEnvios => posiblesEnvios.destino == "Buenos Aires");

const DestinoMendoza = posiblesEnvios.filter(posiblesEnvios => posiblesEnvios.destino == "Mendoza");

const DestinoRosario = posiblesEnvios.filter(posiblesEnvios => posiblesEnvios.destino == "Rosario");

const DestinoSantaFe = posiblesEnvios.filter(posiblesEnvios => posiblesEnvios.destino == "Santa Fe");

const DestinoSanLuis = posiblesEnvios.filter(posiblesEnvios => posiblesEnvios.destino == "San Luis");



