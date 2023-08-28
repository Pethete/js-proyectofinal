const form = document.getElementById("reservaForm");
const contenedorReservas = document.querySelector('#lista-reservas tbody');
let reservas = [];

function guardarReserva() {
  localStorage.setItem('reservas', JSON.stringify(reservas));
}

function cargarReserva() {
  if (localStorage.getItem('reservas') !== null) {
      reservas = JSON.parse(localStorage.getItem('reservas'));
  }
}

function mostrarReservas() {
  reservas.forEach(info => {
    const row = document.createElement('tr');
         row.innerHTML = `
              <td>${info.name}</td>
              <td>${info.email}</td>
              <td>${info.phone}</td>
              <td>${info.day} </td>
              <td>${info.hour} </td>
         `;
         contenedorReservas.appendChild(row);
  });
}

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const selectedDay = document.getElementById("day").value;
    const selectedHour = document.getElementById("hour").value;

    const reservasDone = {
      name: name,
      email: email,
      phone: phone,
      day: selectedDay,
      hour: selectedHour
    };

    reservas.push(reservasDone);
    console.log("Array de reservas", reservas);
    Swal.fire(name + ' tu reserva ha quedado confirmada, para el día ' + selectedDay + ' a las ' + selectedHour)
    form.reset();
  guardarReserva();
  });

  cargarReserva();
  mostrarReservas();