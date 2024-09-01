import express from "express";
import { validateCreate } from "../validators/users.validator.js";
import passport from "passport";

const router = express.Router();

router.post(
  "/register",
  validateCreate,
  passport.authenticate("register", {
    failureRedirect: "/api/failedRegister",
    failureMessage: true,
    session: false,
  }),
  async (req, res) => {
    res.status(201).send({ status: "success", message: "Usuario registrado" });
  }
);

router.get("/failedRegister", async (req, res) => {
  const message = req.session.messages
    ? req.session.messages[0]
    : "Error desconocido";

  if (req.session.messages) {
    delete req.session.messages;
  }

  res.status(400).send({
    status: "error",
    message: message,
    title: message,
  });
});

export default router;
