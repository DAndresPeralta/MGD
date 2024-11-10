import {
  createClient,
  deleteClient,
  getAllClients,
  getClientByCode,
  getClientById,
  updateClient,
} from "../services/client.services.js";
import logger from "../utils/logger.js";

export const getAllClientsController = async (req, res) => {
  try {
    const result = await getAllClients();
    logger.info("Clientes obtenidos con éxito.");
    res.sendSuccess({ result });
  } catch (error) {
    logger.error(`Error al obtener los clientes ${error.message}`);
    res.sendServerError({ message: error.message });
  }
};

export const getClientByIdController = async (req, res) => {
  try {
    const cid = req.params.id;
    const result = await getClientById(cid);
    if (!result) {
      logger.warn("El cliente no pertenece a la base de datos.");
      return res.sendUserError({
        message: "El cliente no pertenece a la base de datos.",
      });
    }
    logger.info("Cliente obtenido con éxito");
    res.sendSuccess({ result });
  } catch (error) {
    logger.error(`Error al obtener cliente ${error.message}`);
    res.sendServerError({ message: error.message });
  }
};

export const getClientByCodeController = async (req, res) => {
  try {
    const { code } = req.body;
    const result = await getClientByCode(code);
    if (!result) {
      logger.warn("El cliente no pertenece a la base de datos.");
      return res.sendUserError({
        message: "El cliente no pertenece a la base de datos.",
      });
    }
    logger.info("Cliente obtenido con éxito");
    res.sendSuccess({ result });
  } catch (error) {
    logger.error(`Error al obtener cliente ${error.message}`);
    res.sendServerError({ message: error.message });
  }
};

export const createClientController = async (req, res) => {
  try {
    const { code, lastName, firstName, company, cuil, email } = req.body;

    if (cuil.toString().length !== 11)
      return res.sendUserError({ msg: "El cuil debe contener 11 caracteres." });

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
      logger.info("Cliente creado con éxito");
      return res.sendSuccess({ result });
    }
    logger.warn("Cliente existente");
    return res.sendUserError({ msg: "Cliente ya registrado" });
  } catch (error) {
    logger.error(`Error al crear el cliente ${error.message}`);
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
      logger.info("Cliente modificado con éxito");
      res.sendSuccess({ result });
    } else {
      logger.warn("El cliente no existe");
      res.sendUserError({ msg: "El cliente no existe en la base de datos" });
    }
  } catch (error) {
    logger.error(`Error al modificar el cliente ${error.message}`);
    res.sendServerError({ message: error.message });
  }
};

export const deleteClientController = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await deleteClient(id);
    logger.info("Cliente eliminado con éxito");
    res.sendSuccess({ result });
  } catch (error) {
    logger.error(`Error al eliminar el cliente ${error.message}`);
    res.sendServerError({ message: error.message });
  }
};
