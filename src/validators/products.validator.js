import { check } from "express-validator";
import { validationResult } from "express-validator";

export const validateCreate = [
  check("code").exists().not().isEmpty(),
  check("product").exists().not().isEmpty(),
  check("brand").exists().not().isEmpty(),
  check("weight").exists().not().isEmpty(),
  check("stock").exists().not().isEmpty(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export const validateResult = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: "Campos incompletos",
      title: "Campos incompletos",
    });
  }
};
