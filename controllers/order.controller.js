import mongoose from "mongoose";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
} from "../services/order.services.js";
import { getClientById, updateClient } from "../services/client.services.js";

// Traemos todas las ordenes
export const getAllOrdersController = async (req, res) => {
  try {
    const result = await getAllOrders();
    res.sendSuccess({ result });
  } catch (error) {
    res.sendServerError({ message: error.message });
  }
};

// Treaemos orden por ID
export const getOrderByIdController = async (req, res) => {
  try {
    const oid = req.params.id;
    const result = await getOrderById(oid);
    res.sendSuccess({ result });
  } catch (error) {
    res.sendServerError({ message: error.message });
  }
};

// Este endpoint maneja ambos ingreso de productos, mediante req.param y req.body
export const createOrderController = async (req, res) => {
  try {
    const { cid, pid } = req.params;

    if (pid === undefined) {
      const { item, status, pay } = req.body;
      if (!mongoose.Types.ObjectId.isValid(cid)) {
        return res.sendUserError({ msg: "Cliente inexistente." });
      }

      const newOrder = {
        client: [{ client: cid }],
        item,
        status,
        pay,
      };

      // Creo la orden.
      const result = await createOrder(newOrder);
      // Traigo la orden recien creada para obtener su id.
      const resentOrder = await getOrderById(result._id.toString());
      // Traigo el cliente al que le deseo asignar la orden.
      const assignClient = await getClientById(cid);

      // Creo un objeto con los datos del cliente y solo modifico/agrego la orden al atributo array orders.
      const assigningOrder = {
        code: assignClient.code,
        lastName: assignClient.lastName,
        firstName: assignClient.firstName,
        company: assignClient.company,
        cuil: assignClient.cuil,
        email: assignClient.email,
        status: assignClient.status,
        // Esta sintaxis me permite no sobreescribir la orden sino que se suma la ultima orden al final del array de otra orden anterior.
        orders: [...assignClient.orders, { order: resentOrder._id.toString() }],
      };

      // Modifico el cliente.
      await updateClient(cid, assigningOrder);
      return res.sendSuccess({ result });
    } else {
      const { quantity, status, pay } = req.body;

      if (
        !mongoose.Types.ObjectId.isValid(cid) ||
        !mongoose.Types.ObjectId.isValid(pid)
      ) {
        return res.sendUserError({ msg: "Cliente o producto inexistentes." });
      }

      const newOrder = {
        client: [{ client: cid }],
        item: [{ product: pid, quantity }],
        status,
        pay,
      };

      const result = await createOrder(newOrder);
      // Traigo la orden recien creada para obtener su id.
      const resentOrder = await getOrderById(result._id.toString());
      // Traigo el cliente al que le deseo asignar la orden.
      const assignClient = await getClientById(cid);

      // Creo un objeto con los datos del cliente y solo modifico/agrego la orden al atributo array orders.
      const assigningOrder = {
        code: assignClient.code,
        lastName: assignClient.lastName,
        firstName: assignClient.firstName,
        company: assignClient.company,
        cuil: assignClient.cuil,
        email: assignClient.email,
        status: assignClient.status,
        // Esta sintaxis me permite no sobreescribir la orden sino que se suma la ultima orden al final del array de otra orden anterior.
        orders: [...assignClient.orders, { order: resentOrder._id.toString() }],
      };

      // Modifico el cliente.
      await updateClient(cid, assigningOrder);
      return res.sendSuccess({ result });
    }
  } catch (error) {
    res.sendServerError({ message: error.message });
  }
};

// Falta arreglar el update del producto
export const updateOrderController = async (req, res) => {
  try {
    // Extraigo datos enviadpor por params y query
    const oid = req.params.id;
    const { cid, oldpid, newpid, quantity, status, pay } = req.body;

    // Traigo la orden correspondiente al id extraido
    const existOrder = await getOrderById(oid);

    if (!existOrder) return res.sendUserError({ msg: "Orden inexistente." });

    //----------------------------
    // Elimino la orden del cliente viejo
    // Busco el cliente viejo a traves del existOrder
    const oldClient = await getClientById(
      existOrder.client[0].client._id.toString()
    );

    // Elimino la orden del array orders con un filter
    oldClient.orders = oldClient.orders.filter(
      (e) => e.order._id.toString() !== oid
    );

    // Envio a updateClient los parametros para persistir.
    const resultOldClient = await updateClient(oldClient._id, oldClient);
    //---------------------------

    // Busco el cliente nuevo.
    let newClient = await getClientById(cid);

    // Agrego a su array orders la nueva orden.
    newClient.orders = [...newClient.orders, { order: oid }];

    // Envio a updateClient los parametros para persistir.
    const resultNewClient = await updateClient(cid, newClient);

    //---------------------------

    // Modifico o mantengo los atributos
    existOrder.client =
      cid !== undefined ? [{ client: cid }] : existOrder.client;

    existOrder.status = status !== undefined ? status : existOrder.status;
    existOrder.pay = pay !== undefined ? pay : existOrder.pay;

    // recorro el array item, si encuentro un producto con id igual al recibido por query (body) modifico ese producto. Sino coinciden mantengo el/los
    // productos del array. Evito asi sobreescrituras y perdida de datos.
    const updatedProduct = existOrder.item.map((e) => {
      if (e.product._id.toString() === oldpid) {
        return { product: newpid, quantity };
      }
      return e;
    });

    // Modifico el atributo item y le asigno el nuevo array.
    existOrder.item = updatedProduct;

    // let result = "oki";
    let result = await updateOrder({ _id: oid }, existOrder);
    return res.sendSuccess({ result });
  } catch (error) {
    res.sendServerError({ message: error.message });
  }
};

// Elimina un producto de la orden
export const deleteProductFromOrder = async (req, res) => {
  try {
    const { cid, pid } = req.params;

    if (
      !mongoose.Types.ObjectId.isValid(cid) ||
      !mongoose.Types.ObjectId.isValid(pid)
    ) {
      return res.status(400).json({ msg: "ID de carrito o producto inválido" });
    }

    const data = { $pull: { item: { product: pid } } };

    const result = await updateOrder(cid, data);
    res.sendSuccess({ result });
  } catch (error) {
    res.sendServerError({ message: error.message });
  }
};

// Elimina la orden completa
export const deleteOrderController = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await deleteOrder(id);
    res.sendSuccess({ result });
  } catch (error) {
    res.sendServerError({ message: error.message });
  }
};

// // Agrega un producto por query param
// export const createOrderController = async (req, res) => {
//   try {
//     const { cid, pid } = req.params;
//     const { quantity, status, pay } = req.body;

//     if (
//       !mongoose.Types.ObjectId.isValid(cid) ||
//       !mongoose.Types.ObjectId.isValid(pid)
//     ) {
//       return res.sendUserError({ msg: "Cliente o producto inexistentes." });
//     }

//     const newOrder = {
//       client: [{ client: cid }],
//       item: [{ product: pid, quantity }],
//       status,
//       pay,
//     };

//     const result = await createOrder(newOrder);

//     res.sendSuccess({ result });
//   } catch (error) {
//     res.sendServerError({ message: error.message });
//   }
// };

// // Agrega mas de un producto por req.body
// export const createOrderControllerByBody = async (req, res) => {
//   try {
//     const cid = req.params.id;
//     console.log(cid);

//     const { item, status, pay } = req.body;

//     console.log(item);

//     if (!mongoose.Types.ObjectId.isValid(cid)) {
//       return res.sendUserError({ msg: "Cliente o producto inexistentes." });
//     }

//     const newOrder = {
//       client: [{ client: cid }],
//       item,
//       status,
//       pay,
//     };

//     const result = await createOrder(newOrder);
//     res.sendSuccess({ result });
//   } catch (error) {
//     res.sendServerError({ message: error.message });
//   }
// };
