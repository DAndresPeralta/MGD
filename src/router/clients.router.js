import {
  createClientController,
  deleteClientController,
  getAllClientsController,
  getClientByCodeController,
  getClientByIdController,
  updateClientController,
} from "../controllers/client.controller.js";
import CustomRouter from "./router.js";

export default class ClientRouter extends CustomRouter {
  init() {
    this.get("/client", getAllClientsController);

    this.get("/client/:id", getClientByIdController);

    this.get("/clientcode", getClientByCodeController);

    this.post("/client", createClientController);

    this.put("/client/:id", updateClientController);

    this.delete("/client/:id", deleteClientController);
  }
}
