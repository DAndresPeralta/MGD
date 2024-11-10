import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductByCode,
  getProductById,
  updateProduct,
} from "../services/product.services.js";
import logger from "../utils/logger.js";

export const getAllProductsController = async (req, res) => {
  try {
    const result = await getAllProducts();
    logger.info("Productos obtenidos con éxito.");
    res.sendSuccess({ result });
  } catch (error) {
    logger.error(`Error al obtener los productos ${error.message}`);
    res.sendServerError({ message: error.message });
  }
};

export const getProductByIdController = async (req, res) => {
  try {
    const pid = req.params.id;
    const result = await getProductById(pid);
    logger.info("Producto obtenido con éxito.");
    res.sendSuccess({ result });
  } catch (error) {
    logger.error(`Error al obtener el producto ${error.message}`);
    res.sendServerError({ message: error.message });
  }
};

export const createProductController = async (req, res, next) => {
  try {
    const { code, product, brand, weight, stock, obs } = req.body;

    // Buscar producto en la BD por code.
    const role = stock > 0 ? true : false;

    const existProduct = await getProductByCode(code);

    if (!existProduct) {
      const result = await createProduct({
        code,
        product,
        brand,
        weight,
        stock,
        role,
        obs,
      });
      logger.info("Producto creado con éxito.");
      return res.sendSuccess({ result });
    }

    const pid = existProduct._id;
    const result = await updateProduct(
      { _id: pid },
      {
        code: existProduct.code,
        product: existProduct.product,
        brand: existProduct.brand,
        weight: existProduct.weight,
        stock: existProduct.stock + stock,
        role: role,
        obs: existProduct.obs,
      }
    );
    logger.info("Stock incrementado con éxito");
    res.sendSuccess({ result });
  } catch (error) {
    logger.error(`Error al crear el producto ${error.message}`);
    res.sendServerError({ message: error.message });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const pid = req.params.id;
    const { code, product, brand, weight, stock, obs } = req.body;
    let role = undefined;

    if (stock === undefined) {
      role = undefined;
    } else if (stock >= 0) {
      role = stock > 0 ? true : false;
    }

    const updatedProduct = {
      code,
      product,
      brand,
      weight,
      stock,
      role,
      obs,
    };

    const extractedProduct = await getProductById(pid);

    if (extractedProduct) {
      extractedProduct.code =
        updatedProduct.code !== undefined
          ? updatedProduct.code
          : extractedProduct.code;
      extractedProduct.product =
        updatedProduct.product !== undefined
          ? updatedProduct.product
          : extractedProduct.product;
      extractedProduct.brand =
        updatedProduct.brand !== undefined
          ? updatedProduct.brand
          : extractedProduct.brand;
      extractedProduct.weight =
        updatedProduct.weight !== undefined
          ? updatedProduct.weight
          : extractedProduct.weight;
      extractedProduct.stock =
        updatedProduct.stock !== undefined
          ? updatedProduct.stock
          : extractedProduct.stock;
      extractedProduct.stock =
        updatedProduct.stock !== undefined
          ? updatedProduct.stock
          : extractedProduct.stock;
      extractedProduct.role =
        updatedProduct.role !== undefined
          ? (updatedProduct.role = role)
          : (extractedProduct.role = extractedProduct.stock > 0 ? true : false);
      extractedProduct.obs =
        updatedProduct.obs !== undefined
          ? updatedProduct.obs
          : extractedProduct.obs;

      let result = await updateProduct({ _id: pid }, extractedProduct);
      logger.info("Producto modificado con éxito.");
      res.sendSuccess({ result });
    } else {
      logger.warn("Producto inexistente.");
      res.senUserError({ msg: "Producto inexistente." });
    }
  } catch (error) {
    logger.error(`Error al modificar los productos ${error.message}`);
    res.sendServerError({ message: error.message });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    const pid = req.params.id;
    const result = await deleteProduct(pid);
    logger.info("Producto eliminado con éxito");
    res.sendSuccess({ result });
  } catch (error) {
    logger.error(`Error al eliminar el producto ${error.message}`);
    res.sendServerError({ message: error.message });
  }
};
