// import axios from "axios";
import { renderAddProduct } from "./js/renderRoleUser.js";
const closeSession = document.querySelector(".Boton");
const btnProducts = document.getElementById("btnProductos");
const addProduct = document.getElementById("addProduct");
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

//* MANEJO DE BOTONES*/
// Manejo de boton desplegable "Productos"
btnProducts.addEventListener("click", function () {
  var submenu = document.getElementById("submenuProductos");
  submenu.style.display = submenu.style.display === "none" ? "block" : "none";
});

//* MANEJO DE SUB-BOTONES*/
// Manejo de SubBoton "Agregar"
addProduct.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.innerHTML = renderAddProduct();
});

//* MANEJO DE TODOS LOS "SUBMIT" RENDERIZADOS AL INICIO O DINAMICO EN EL DOM*/
document.body.addEventListener("submit", async (event) => {
  if (event.target && event.target.id === "formAddProduct") {
    event.preventDefault();
    try {
      const code = document.getElementById("code");
      const product = document.getElementById("product");
      const brand = document.getElementById("brand");
      const amount = document.getElementById("amount");
      const stock = document.getElementById("stock");
      const obs = document.getElementById("obs");

      const response = await axios.post(
        "http://localhost:4000/api/product",
        {
          code: code.value,
          product: product.value,
          brand: brand.value,
          amount: amount.value,
          stock: stock.value,
          obs: obs.value,
        },
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
  }
});
