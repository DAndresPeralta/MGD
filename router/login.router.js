import express from "express";
import passport from "passport";
import { validateSign } from "../validators/users.validator.js";
import { generateToken } from "../utils/utils.js";

const router = express.Router();

// router.post("/loginAdmin", async (req, res) => {
//   try {
//     const { userName, password } = req.body;

//     if (!userName || !password) {
//       return res.status(400).send({
//         status: "error",
//         message: "Campos incompletos",
//         title: "Campos incompletos",
//       });
//     }

//     const userCheck = await userModel.findOne({ userName: userName }).lean();

//     if (!userCheck) {
//       return res.status(404).send({
//         status: "error",
//         message: "Usuario inexistente",
//         title: "Usuario inexistente",
//       });
//     }

//     const passwordCheck = await bcryptjs.compare(password, userCheck.password);

//     if (!passwordCheck) {
//       return res.status(404).send({
//         status: "error",
//         message: "Contraseña incorrecta",
//         title: "Contraseña incorrecta",
//       });
//     }

//     // Guardo datos de session para poder entrar areas restringidas
//     req.session.userName = userCheck.userName;
//     req.session.role = userCheck.role;

//     return res.status(200).send({
//       status: "success",
//       message: "Usuario registrado",
//       title: "Bienvenido",
//       redirect: "/index",
//     });
//   } catch (error) {
//     res
//       .status(500)
//       .send({ status: "Error", message: "Error interno del servidor" });
//   }
// });

// router.post("/loginUser", async (req, res) => {
//   const { userName, password } = req.body;

//   if (!userName || !password) {
//     return res
//       .status(400)
//       .send({ status: "Error", message: "Campos incompletos" });
//   }

//   const userCheck = await userModel.findOne({ userName: userName }).lean();
//   // Si no existe el usuario se rechaza
//   if (!userCheck) {
//     return res
//       .status(404)
//       .send({ status: "Error", message: "Usuario inexistente" });
//   }

//   // Se comparan las contraseñas
//   const loginCheck = await bcryptjs.compare(password, userCheck.password);
//   // Si no existe coincidencia de contraseña se rechaza
//   if (!loginCheck) {
//     return res
//       .status(404)
//       .send({ status: "Error", message: "Contraseña incorrecta" });
//     // Si el usuario no es ADMINISTRADOR se rechaza
//   } else if (userCheck.role === true) {
//     console.log("true");

//     req.session.userName = userCheck.userName;
//     req.session.role = userCheck.role;

//     return res.status(200).send({
//       status: "ok",
//       message: "Usuario registrado",
//       redirect: "/index",
//     });
//   } else {
//     console.log("false");
//     req.session.userName = userCheck.userName;
//     req.session.role = userCheck.role;

//     return res.status(200).send({
//       status: "ok",
//       message: "Usuario registrado",
//       redirect: "/user",
//     });
//   }
// });

router.post(
  "/loginAdmin",
  validateSign,
  passport.authenticate("login", {
    failureRedirect: "/api/failedLogin",
    session: false,
  }),
  async (req, res) => {
    if (!req.userCheck) {
      const user = req.user;
      const access_token = generateToken({ user });
      res.cookie("jwt", access_token, {
        httpOnly: true,
        secure: true,
        maxAge: 600000,
      });

      if (req.user.role === "ADMIN") {
        res.status(200).send({
          status: "success",
          title: "Bienvenido",
          payload: req.user,
          redirect: "/index",
        });
      } else {
        res.status(200).send({
          status: "success",
          title: "Bienvenido",
          payload: req.user,
          redirect: "/user",
        });
      }
    }
  }
);

router.get("/failedLogin", async (req, res) => {
  res.status(400).send({
    status: "error",
    msg: "Error de Autenticacion",
    title: "Usuario o contraseña incorrectos",
  });
});

export default router;
