import express from "express";
import { passportCall } from "../utils/utils.js";

const router = express.Router();

// router.post("/logout", (req, res) => {
//   req.session.destroy((err) => {
//     if (!err) {
//       // Se destruyen los datos de sesion por seguridad y se devulve al front una respuesta con un redirect.
//       // Este redirect debe ser captad por el Front para referizar.
//       res.status(200).send({
//         status: "ok",
//         message: "Sesion cerrada",
//         redirect: "/",
//       });
//     } else {
//       res.send({ status: "Logout Error", body: err });
//     }
//   });
// });

// router.get(
//   "/auth",
//   passportCall("jwt", (req, res) => {
//     // try {
//     //   if (req.user) {
//     //     console.log("Usuario autenticado:", req.user);
//     //     return res.status(200).json({ success: true });
//     //   } else {
//     //     console.log("JWT no válido o no autenticado");
//     //     return res
//     //       .status(401)
//     //       .json({ success: false, message: "JWT no válido o no autenticado" });
//     //   }
//     // } catch (error) {
//     //   console.error("Error en el endpoint /auth:", error);
//     //   return res
//     //     .status(500)
//     //     .json({ success: false, message: "Error interno del servidor" });
//     // }
//   })
// );

// Esta ruta es para ruta protegida de Svelte
router.get("/auth", passportCall("jwt"), (req, res) => {
  try {
    if (req.user) {
      console.log("Usuario autenticado:", req.user);
      return res.status(200).json({ success: true });
    } else {
      console.log("JWT no válido o no autenticado");
      return res
        .status(401)
        .json({ success: false, message: "JWT no válido o no autenticado" });
    }
  } catch (error) {
    console.error("Error en el endpoint /auth:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error interno del servidor" });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("jwt");
  return res.status(200).send({
    status: "success",
    message: "Cerrando sesión",
    redirect: "/",
  });
});

export default router;
