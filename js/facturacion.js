let facturas = [];
//Obtener el elemento tbody de la tabla
const tbody = document.querySelector('#tablaFacturas tbody');

//Cargar datos iniciales desde el archivo JSON
function cargarDatosIniciales() {
    fetch("https://64a070e9ed3c41bdd7a74cc7.mockapi.io/facturacion/Factura")
        .then(response => response.json())
        .then(data => {
            facturas = data;
            mostrarTabla();
        })
        .catch(error => console.log('Error al cargar los datos:', error));
}

//Funcion para crear una nueva factura
function crearFactura() {
    const cliente = document.querySelector('#cliente').value;
    const cuit = document.querySelector('#cuit').value;
    const nrofactura = document.querySelector('#nrofactura').value;
    const tipoFactura = document.querySelector('#tipoFactura').value;
    const valor = document.querySelector('#valor').value;

    //Crear objeto factura
    const factura = {
        cliente: cliente,
        cuit: cuit,
        nrofactura: nrofactura,
        tipoFactura: tipoFactura,
        valor: valor
    };

    //Agregar factura al arreglo
    facturas.push(factura);

    //Limpiar los campos del formulario
    document.querySelector('#cliente').value = '';
    document.querySelector('#cuit').value = '';
    document.querySelector('#nrofactura').value = '';
    document.querySelector('#valor').value = '';

    // Actualizar la tabla
    mostrarTabla();

    // Guardar los datos en el archivo JSON
    guardarDatosEnJSON();
}

// Funcion para mostrar la tabla con las facturas
function mostrarTabla() {
    // Limpiar el tbody antes de mostrar los datos
    tbody.innerHTML = '';

    // Agregar filas a la tabla
    for (const factura of facturas) {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${factura.cliente}</td>
            <td>${factura.cuit}</td>
            <td>${factura.nrofactura}</td>
            <td>${factura.tipoFactura}</td>
            <td>${factura.valor}</td>
        `;
        if (factura.valor > 15000) {
            fila.classList.add('resaltada');
        }
        tbody.appendChild(fila);
    }
}

// Funcion para generar 3 elementos automáticamente
function generarElementosAutomaticos() {
    for (let i = 0; i < 3; i++) {
        // Generar datos al azar 
        const cliente = "Cliente " + (i + 1);
        const cuit = "CUIT " + (i + 1);
        const nrofactura = (i + 1);
        const tipoFactura = "Factura A";
        const valor = Math.floor(Math.random() * 1000) + 1; // valor aleatorio entre 1 y 1000

        // Crear objeto factura
        const factura = {
            cliente: cliente,
            cuit: cuit,
            nrofactura: nrofactura,
            tipoFactura: tipoFactura,
            valor: valor
        };

        // Agregar factura al arreglo
        facturas.push(factura);
    }

    // Actualizar la tabla
    mostrarTabla();
}

// Funcion para vaciar la tabla
function vaciarTabla() {
    facturas = [];
    mostrarTabla();
    guardarDatosEnJSON();
}

// Evento submit del formulario
document.querySelector('#facturacion').addEventListener('submit', function (e) {
    e.preventDefault();
    crearFactura();
});

// Evento click del boton para generar 3 elementos automaticamente
document.querySelector('#generarElementos').addEventListener('click', function () {
    generarElementosAutomaticos();
});

// Evento click del boton para vaciar la tabla
document.querySelector('#vaciarTabla').addEventListener('click', function () {
    vaciarTabla();
});

// Obtener referencia al boton y a la tabla
const botonEliminarUltimaFila = document.querySelector('#eliminarUltimaFila');
const tablaFacturas = document.querySelector('#tablaFacturas');

// Función para eliminar la ultima fila de la tabla
function eliminarUltimaFila() {
    const filas = tablaFacturas.getElementsByTagName('tr');

    // Verificar si hay al menos una fila ademas del encabezado
    if (filas.length > 1) {
        const ultimaFila = filas[filas.length - 1];
        ultimaFila.remove();
    }
}

// Cargar datos iniciales al cargar la pagina
cargarDatosIniciales();

// Agregar evento click al boton
botonEliminarUltimaFila.addEventListener('click', eliminarUltimaFila);


