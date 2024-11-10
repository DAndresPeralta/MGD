import {
  createOrderController,
  deleteOrderController,
  deleteProductFromOrder,
  getAllOrdersController,
  getOrderByIdController,
  updateOrderController,
} from "../controllers/order.controller.js";
import { authorization, passportCall } from "../utils/utils.js";
import CustomRouter from "./router.js";

export default class OrderRouter extends CustomRouter {
  init() {
    this.get("/order", getAllOrdersController);

    this.get("/order/:id", getOrderByIdController);

    // this.post("/order/:cid/:pid", createOrderController);

    this.post("/ordertest/:cid/:pid?", createOrderController);

    // this.post("/order/:id", createOrderControllerByBody);

    this.put("/order/:id", updateOrderController);

    this.delete("/orderP/:cid/:pid", deleteProductFromOrder);

    // Endpoint protegido por Token y Role, manejo sensible de datos.
    this.delete(
      "/order/:id",
      passportCall("jwt"),
      authorization("ADMIN"),
      deleteOrderController
    );
  }
}
