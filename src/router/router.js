import { Router } from "express";

export default class CustomRouter {
  constructor() {
    this.router = Router();
    this.init();
  }

  getRouter() {
    return this.router;
  }

  init() {}

  get(path, ...callbacks) {
    this.router.get(
      path,
      this.generateCustomResponse,
      this.applyCallbacks(callbacks)
    );
  }

  post(path, ...callbacks) {
    this.router.post(
      path,
      this.generateCustomResponse,
      this.applyCallbacks(callbacks)
    );
  }

  put(path, ...callbacks) {
    this.router.put(
      path,
      this.generateCustomResponse,
      this.applyCallbacks(callbacks)
    );
  }

  delete(path, ...callbacks) {
    this.router.delete(
      path,
      this.generateCustomResponse,
      this.applyCallbacks(callbacks)
    );
  }

  applyCallbacks(callbacks) {
    // Este metodo map recorre cada funcion callback almacenada en el array callback y almacena en un array los parametros recibidos.
    return callbacks.map((callback) => async (...params) => {
      try {
        // Apply es una funcion nativa de JS.
        // Aca lo que hace apply es llamar a el [] callback.
        // This asegura que se llame a la instancia contenida en la clase(mayor consistencia).
        // params envia todos los parametros contenidos en dicho [].
        await callback(...params);
      } catch (error) {
        console.log(error);
        params[1].status(500).send(error);
      }
    });
  }

  generateCustomResponse = (req, res, next) => {
    res.sendSuccess = (payload) => res.send({ status: "success", payload });
    res.sendServerError = (error) => res.send({ status: "error", error });
    res.sendUserError = (error) => res.send({ status: "error", error });
    next();
  };

  //!AGREGAR GENERATECUSTOMRESPONSE

  // handlePolicies = (policies) => (req, res) => {
  //   if (policies[0] === "PUBLIC") return next();
  //   const authHeaders = req.headers.authorization;
  //   if (!authHeaders) {
  //     return res.status(401).send({ status: "error", error: "No autorizado" });
  //   }
  //   let user = checkToken();
  //   if (!policies.includes(user.role.toUpperCase())) {
  //     return res.status(401).send({ status: "error", error: "No autorizado" });
  //   }
  //   req.user = user;
  //   next();
  // };
}
