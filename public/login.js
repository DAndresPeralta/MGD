const adminForm = document.getElementById("adminForm");
const userForm = document.getElementById("userForm");
const closeSession = document.querySelector(".Boton");

adminForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userName = document.getElementById("adminName");
  const password = document.getElementById("adminPassword");

  //!logica con FETCH
  // const res = await fetch("http://localhost:4000/api/loginAdmin", {
  //   method: "POST",
  //   credentials: "include",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     userName: userName.value,
  //     password: password.value,
  //   }),
  // });

  // const data = await res.json();
  // console.log(data);

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
  //     title: data.title,
  //     icon: "success",
  //     showConfirmButton: false, //Quitamos el boton de confirmacion.
  //     timer: 3000, // Timer para que desaparezca automaticamente el alerta.
  //     background: "#007091", //Cambiamos el color de fondo.
  //   });
  //   // Aca capturamos desde la res del BACK, el endpoint para renderizar el redirect.
  //   if (data) {
  //     setTimeout(() => {
  //       window.location.href = data.redirect;
  //     }, 3200);
  //   }
  // }

  //!Logica con AXIOS
  try {
    const response = await axios.post(
      "http://localhost:4000/api/loginAdmin",
      { userName: userName.value, password: password.value },
      { withCredentials: true }
    );

    // Obtengo los datos de response capturado por AXIOS.
    const data = response.data;

    if (response.status >= 200 && response.status < 300) {
      Swal.fire({
        //Agregamos una alerta con la LIBRERIA SweetAlert
        title: data.title,
        icon: "success",
        showConfirmButton: false, //Quitamos el boton de confirmacion.
        timer: 3000, // Timer para que desaparezca automaticamente el alerta.
        background: "#007091", //Cambiamos el color de fondo.
      });
      // Aca capturamos desde la res del BACK, el endpoint para renderizar el redirect.
      if (data) {
        setTimeout(() => {
          window.location.href = data.redirect;
        }, 3200);
      }
      //!AGREGAR IF PARA RESPUESTAS NO 200 O 400 ERROR
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
});

if (closeSession) {
  closeSession.addEventListener("click", async (e) => {
    e.preventDefault();
    //!Logout con FETCH
    // const res = await fetch("http://localhost:4000/api/logout", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
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
  });
}
