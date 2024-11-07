import mongoose from "mongoose";
import {
  createClient,
  deleteClient,
  getAllClients,
  getClientByCode,
  getClientById,
  updateClient,
} from "../services/client.services.js";

export const getAllClientsController = async (req, res) => {
  try {
    const result = await getAllClients();
    res.sendSuccess({ result });
  } catch (error) {
    res.sendServerError({ message: error.message });
  }
};

export const getClientByIdController = async (req, res) => {
  try {
    const cid = req.params.id;
    const result = await getClientById(cid);
    if (!result) {
      return res.sendUserError({
        message: "El cliente no pertenece a la base de datos.",
      });
    }
    console.log(result);
    res.sendSuccess({ result });
  } catch (error) {
    res.sendServerError({ message: error.message });
  }
};

export const getClientByCodeController = async (req, res) => {
  try {
    const { code } = req.body;
    const result = await getClientByCode(code);
    res.sendSuccess({ result });
  } catch (error) {}
};

export const createClientController = async (req, res) => {
  try {
    const { code, lastName, firstName, company, cuil, email } = req.body;
    const existClient = await getClientByCode(code);

    if (!existClient) {
      const data = {
        code,
        lastName,
        firstName,
        company,
        cuil,
        email,
        status: true,
      };
      const result = await createClient(data);
      return res.sendSuccess({ result });
    }
    return res.sendUserError({ msg: "Cliente ya registrado" });
  } catch (error) {
    res.sendServerError({ message: error.message });
  }
};

export const updateClientController = async (req, res) => {
  try {
    const id = req.params.id;
    const { code, lastName, firstName, company, cuil, email, status } =
      req.body;

    let newStatus = status === undefined ? true : false;

    const updatedClient = {
      code,
      lastName,
      firstName,
      company,
      cuil,
      email,
      status: newStatus,
    };

    const existClient = await getClientById(id);

    if (existClient) {
      existClient.code =
        updatedClient.code !== undefined
          ? updatedClient.code
          : existClient.code;
      existClient.lastName =
        updatedClient.lastName !== undefined
          ? updatedClient.lastName
          : existClient.lastName;
      existClient.firstName =
        updatedClient.firstName !== undefined
          ? updatedClient.firstName
          : existClient.firstName;
      existClient.company =
        updatedClient.company !== undefined
          ? updatedClient.company
          : existClient.company;
      existClient.cuil =
        updatedClient.cuil !== undefined
          ? updatedClient.cuil
          : existClient.cuil;
      existClient.email =
        updatedClient.email !== undefined
          ? updatedClient.email
          : existClient.email;
      existClient.status =
        updatedClient.status !== undefined
          ? updatedClient.status
          : existClient.status;

      let result = await updateClient({ _id: id }, existClient);
      res.sendSuccess({ result });
    }
  } catch (error) {
    res.sendServerError({ message: error.message });
  }
};

export const deleteClientController = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await deleteClient(id);
    res.sendSuccess({ result });
  } catch (error) {
    res.sendServerError({ message: error.message });
  }
};
