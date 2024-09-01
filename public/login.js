const adminForm = document.getElementById("adminForm");
const userForm = document.getElementById("userForm");
const closeSession = document.querySelector(".Boton");

if (adminForm) {
  adminForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const userName = document.getElementById("adminName");
    const password = document.getElementById("adminPassword");

    const res = await fetch("http://localhost:4000/api/loginAdmin", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: userName.value,
        password: password.value,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (!res.ok) {
      Swal.fire({
        //Agregamos una alerta con la LIBRERIA SweetAlert
        title: data.title,
        icon: data.status,
        showConfirmButton: false, //Quitamos el boton de confirmacion.
        timer: 3000, // Timer para que desaparezca automaticamente el alerta.
        background: "#007091", //Cambiamos el color de fondo.
      });
      return;
    } else if (res.ok) {
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
    }
  });
}

if (userForm) {
  userForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const userName = document.getElementById("userName");
    const password = document.getElementById("userPassword");

    const res = await fetch("http://localhost:4000/api/loginAdmin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: userName.value,
        password: password.value,
      }),
    });
    if (!res.ok) {
      Swal.fire({
        //Agregamos una alerta con la LIBRERIA SweetAlert
        title: `Credenciales incorrectas`,
        icon: "error",
        showConfirmButton: false, //Quitamos el boton de confirmacion.
        timer: 3000, // Timer para que desaparezca automaticamente el alerta.
        background: "#007091", //Cambiamos el color de fondo.
      });
      return;
    } else if (res.ok) {
      Swal.fire({
        //Agregamos una alerta con la LIBRERIA SweetAlert
        title: `Ingreso`,
        icon: "success",
        showConfirmButton: false, //Quitamos el boton de confirmacion.
        timer: 3000, // Timer para que desaparezca automaticamente el alerta.
        background: "#007091", //Cambiamos el color de fondo.
      });

      // Aca capturamos la ruta de redirect del Back y la renderizamos.
      const resJson = await res.json();
      if (resJson) {
        setTimeout(() => {
          window.location.href = resJson.redirect;
        }, 3200);
      }
    }
  });
}

if (closeSession) {
  closeSession.addEventListener("click", async (e) => {
    console.log("ENTRA");

    e.preventDefault();
    const res = await fetch("http://localhost:4000/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.ok) {
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
  });
}
