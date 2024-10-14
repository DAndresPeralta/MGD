import {
  createOrderController,
  deleteOrderController,
  deleteProductFromOrder,
  getAllOrdersController,
  getOrderByIdController,
  updateOrderController,
} from "../controllers/order.controller.js";
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

    this.delete("/order/:id", deleteOrderController);
  }
}
