import Client from "../models/clients.model.js";

export const getAllClients = async () => {
  const result = await Client.find();
  return result;
};

export const getClientById = async (id) => {
  const result = await Client.findById({ _id: id })
    .populate("orders.order")
    .lean();
  return result;
};

export const getClientByCode = async (code) => {
  const result = await Client.findOne({ code: code });
  return result;
};

export const createClient = async (data) => {
  const result = await Client.create(data);
  return result;
};

export const updateClient = async (id, data) => {
  const result = await Client.updateOne({ _id: id }, data);
  return result;
};

export const deleteClient = async (id) => {
  const result = await Client.deleteOne({ _id: id });
  return result;
};
