import express from "express";
import { authorization, passportCall } from "../utils/utils.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get(
  "/index",
  passportCall("jwt"),
  authorization("ADMIN"),
  (req, res) => {
    res.render("admin");
  }
);

router.get(
  "/user",
  passportCall("jwt"),
  authorization("USER", "ADMIN"),
  (req, res) => {
    res.render("user");
  }
);

export default router;
