const closeSession = document.querySelector(".Boton");
const btnProducts = document.getElementById("btnProductos");
const addView = document.getElementById("addView");
const formContainer = document.querySelector(".form-container");

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

btnProducts.addEventListener("click", function () {
  var submenu = document.getElementById("submenuProductos");
  submenu.style.display = submenu.style.display === "none" ? "block" : "none";
});

addView.addEventListener("click", (e) => {
  e.preventDefault();
  //   window.location.href = "/addProduct";
  formContainer.innerHTML = `
    <div class="form-box">
      {{> productrForm idURL="addProductForm"}}
    </div>
    `;
});
