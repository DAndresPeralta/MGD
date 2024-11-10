import { check } from "express-validator";
import { validationResult } from "express-validator";

// Una cadena de validación es una secuencia de métodos que aplican varias reglas de validación y sanitización a los campos de entrada 'check' es una.
// Estos son métodos aplicados en las cadenas de validación para definir reglas específicas 'isEmpty' es un método.
export const validateCreate = [
  check("firstName").exists().not().isEmpty(),
  check("lastName").exists().not().isEmpty(),
  check("userName").exists().not().isEmpty(),
  check("email").exists().isEmail(),
  check("role").exists().not().isEmpty(),
  check("password").exists().isLength({ min: 8 }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export const validateSign = [
  check("userName").exists().not().isEmpty(),
  check("password").exists().not().isEmpty(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateResult = (req, res, next) => {
  try {
    // Los resultados de la validación se capturan usando validationResult(req), que devuelve un objeto que contiene los errores de validación.
    // Este objeto se puede usar para generar respuestas apropiadas si la validación falla.
    validationResult(req).throw();
    return next();
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: "Campos incompletos",
      title: "Campos incompletos",
    });
  }

  //   console.log("Validando resultados...");
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //! Buen metodo para explicitar errores (errors.array())
  //     console.log("Errores de validación:", errors.array());
  //     return res.status(400).send({
  //       status: "Error",
  //       message: "Campos incompletos o inválidos",
  //       errors: errors.array(),
  //     });
  //   }
  //   console.log("Validación exitosa");
  //   next();
};
