import express from "express";

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

router.post("/logout", (req, res) => {
  res.clearCookie("jwt");
  return res.status(200).send({
    status: "success",
    message: "Cerrando sesión",
    redirect: "/",
  });
});

export default router;
