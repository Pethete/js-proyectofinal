let carrito = [];
const itemsSitio = document.querySelector('#items');
const carritoSitio = document.querySelector('#carrito');
const totalaPagar = document.querySelector('#total');
const botonvaciarCarrito = document.querySelector('#boton-vaciar');

const productos = [
    {
        id: 1,
        nombre: "Avion - Juguete de madera",
        precio: 1000,
        imagen: "../imagenes/aviondemadera.png",
        moneda: "$UY"
    },
    {
        id: 2,
        nombre: "Remera",
        precio: 450,
        imagen: "../imagenes/remera.png",
        moneda: "$UY"
    },
    {
        id: 3,
        nombre: "Taza",
        precio: 150,
        imagen: "../imagenes/taza.png",
        moneda: "$UY"
    },
    {
        id: 4,
        nombre: "Reserva",
        precio: 1800,
        moneda: "$UY"
    }
];



function generarProductos() {
    productos.forEach((info) => {
        if (info.id == 1 || info.id == 2 || info.id ==3){
        const galleryProductos = document.createElement('div');
        galleryProductos.classList.add('card', 'col-sm-4');
        const galleryProductosCardBody = document.createElement('div');
        galleryProductosCardBody.classList.add('card-body');
        const galleryProductosTitle = document.createElement('h5');
        galleryProductosTitle.classList.add('card-title');
        galleryProductosTitle.textContent = info.nombre;
        const galleryProductosImagen = document.createElement('img');
        galleryProductosImagen.classList.add('img-fluid');
        galleryProductosImagen.setAttribute('src', info.imagen);
        const galleryProductosPrecio = document.createElement('p');
        galleryProductosPrecio.classList.add('card-text');
        galleryProductosPrecio.textContent = `${info.moneda}`+ " " + `${info.precio}`;
        const galleryProductosBoton = document.createElement('button');
        galleryProductosBoton.classList.add('btn', 'btn-primary');
        galleryProductosBoton.textContent = '+';
        galleryProductosBoton.setAttribute('marcador', info.id);
        galleryProductosBoton.addEventListener('click', agregarAlCarrito);
        galleryProductosCardBody.appendChild(galleryProductosImagen);
        galleryProductosCardBody.appendChild(galleryProductosTitle);
        galleryProductosCardBody.appendChild(galleryProductosPrecio);
        galleryProductosCardBody.appendChild(galleryProductosBoton);
        galleryProductos.appendChild(galleryProductosCardBody);
        itemsSitio.appendChild(galleryProductos);
    }
    });
}

function agregarAlCarrito(evento) {
    carrito.push(evento.target.getAttribute('marcador'))
    generarCarrito();
    guardarCarrito();

}


function generarCarrito() {
    carritoSitio.textContent = '';
    const carritoSinDuplicados = [...new Set(carrito)];
    carritoSinDuplicados.forEach((item) => {
        const miItem = productos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            return itemId === item ? total += 1 : total;
        }, 0);
        const galleryProductos = document.createElement('li');
        galleryProductos.classList.add('list-group-item', 'text-right', 'mx-2');
        galleryProductos.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}`;
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);
        galleryProductos.appendChild(miBoton);
        carritoSitio.appendChild(galleryProductos);
    });
    totalaPagar.textContent = calcularTotal();
}


function borrarItemCarrito(evento) {
    const id = evento.target.dataset.item;
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    generarCarrito();
    guardarCarrito();
    Swal.fire('Se ha borrado item del carrito')
}


function calcularTotal() {
    return carrito.reduce((total, item) => {
        const miItem = productos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        return total + miItem[0].precio;
    }, 0).toFixed(2);
   
}


function vaciarCarrito() {
    carrito = [];
    generarCarrito();
    localStorage.clear();
}

botonvaciarCarrito.addEventListener('click', vaciarCarrito);


function guardarCarrito () {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarrito() {
    if (localStorage.getItem('carrito') !== null) {
        carrito = JSON.parse(localStorage.getItem('carrito'));
    }
}

// Inicio
cargarCarrito();
generarProductos();
generarCarrito();