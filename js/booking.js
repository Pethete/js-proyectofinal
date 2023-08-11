const form = document.getElementById("reservaForm");
const reservas = [];

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
  });