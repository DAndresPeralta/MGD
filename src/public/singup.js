// ***************** LADO "FRONT" Ó "CLIENTE" *****************
// Traemos los datos del formulario
const form = document.getElementById("singupForm");
const closeSession = document.getElementById("btnC");
// Generamos el evento que se acciona al apretar el boton de tipo submit
form.addEventListener("submit", async (e) => {
  // Detiene la recarga automatica al apretar el boton
  e.preventDefault();

  // Traigo los datos ingresados en el formulario
  const lastName = document.getElementById("lastNameS");
  const firstName = document.getElementById("firstNameS");
  const userName = document.getElementById("userNameS");
  const email = document.getElementById("emailS");
  const role = document.getElementById("role");
  const password = document.getElementById("passwordS");
  console.log(role.value);

  try {
    const response = await axios.post(
      "http://localhost:4000/api/register",
      {
        firstName: firstName.value,
        lastName: lastName.value,
        userName: userName.value,
        email: email.value,
        role: role.value,
        password: password.value,
      },
      { withCredentials: true }
    );

    if (response.status >= 200 && response.status < 300) {
      Swal.fire({
        //Agregamos una alerta con la LIBRERIA SweetAlert
        title: `Registro Exitoso!`,
        icon: "success",
        showConfirmButton: false, //Quitamos el boton de confirmacion.
        timer: 3000, // Timer para que desaparezca automaticamente el alerta.
        background: "#007091", //Cambiamos el color de fondo.
      });
    }
  } catch (error) {
    const data = error.response
      ? error.response.data
      : { title: "Error", msg: "Error desconocido" };

    Swal.fire({
      title: data.title || "Error",
      icon: data.status || "error",
      showConfirmButton: false,
      timer: 3000,
      background: "#007091",
    });
  }

  // Fetch con metodo POST para conectarnos con el backend y enviar los datos para persistir.
  // const res = await fetch("http://localhost:4000/api/register", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     firstName: firstName.value,
  //     lastName: lastName.value,
  //     userName: userName.value,
  //     email: email.value,
  //     role: role.value,
  //     password: password.value,
  //   }),
  // });

  // const data = await res.json();

  // // Lo siguiente nos dice que si la respuesta por parte del BACK no es OK, se termina la ejecucion.
  // if (!res.ok) {
  //   Swal.fire({
  //     //Agregamos una alerta con la LIBRERIA SweetAlert
  //     title: data.title,
  //     icon: data.status,
  //     showConfirmButton: false, //Quitamos el boton de confirmacion.
  //     timer: 3000, // Timer para que desaparezca automaticamente el alerta.
  //     background: "#007091", //Cambiamos el color de fondo.
  //   });
  //   return;
  // } else if (res.ok) {
  //   Swal.fire({
  //     //Agregamos una alerta con la LIBRERIA SweetAlert
  //     title: `Registro Exitoso!`,
  //     icon: "success",
  //     showConfirmButton: false, //Quitamos el boton de confirmacion.
  //     timer: 3000, // Timer para que desaparezca automaticamente el alerta.
  //     background: "#007091", //Cambiamos el color de fondo.
  //   });
  // }
});

closeSession.addEventListener("click", async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post("http://localhost:4000/api/logout", {
      withCredentials: true,
    });

    const data = response.data;

    if (response.status >= 200 && response.status < 300) {
      Swal.fire({
        title: data.message,
        icon: data.status,
        showConfirmButton: false, //Quitamos el boton de confirmacion.
        timer: 3000, // Timer para que desaparezca automaticamente el alerta.
        background: "#007091", //Cambiamos el color de fondo.
      });

      // Aca capturamos la ruta de redirect del Back y la renderizamos.
      if (data) {
        setTimeout(() => {
          window.location.href = data.redirect;
        }, 3200);
      }
    }
  } catch (error) {
    console.log(error);
  }

  // // Fetch para cerrar sesion y destruir datos de session.
  // const res = await fetch("http://localhost:4000/api/logout", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  // const data = await res.json();

  // if (res.ok) {
  //   Swal.fire({
  //     title: data.message,
  //     icon: data.status,
  //     showConfirmButton: false, //Quitamos el boton de confirmacion.
  //     timer: 3000, // Timer para que desaparezca automaticamente el alerta.
  //     background: "#007091", //Cambiamos el color de fondo.
  //   });

  //   // Aca capturamos la ruta de redirect del Back y la renderizamos.
  //   if (data) {
  //     setTimeout(() => {
  //       window.location.href = data.redirect;
  //     }, 3200);
  //   }
  // }
});
