import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../services/product.services.js";

export const getAllProductsController = async (req, res) => {
  try {
    const result = await getAllProducts();
    res.sendSuccess({ result });
  } catch (error) {
    res.sendServerError({ message: error.message });
  }
};

export const getProductByIdController = async (req, res) => {
  try {
    const pid = req.params.id;
    const result = await getProductById(pid);
    res.sendSuccess({ result });
  } catch (error) {
    res.sendServerError({ message: error.message });
  }
};

export const createProductController = async (req, res) => {
  try {
    const { code, product, brand, weight, stock, obs } = req.body;
    const role = stock > 0 ? true : false;
    const result = await createProduct({
      code,
      product,
      brand,
      weight,
      stock,
      role,
      obs,
    });
    res.sendSuccess({ result });
  } catch (error) {
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
      res.sendSuccess({ result });
    }
  } catch (error) {
    res.sendServerError({ message: error.message });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    const pid = req.params.id;
    const result = await deleteProduct(pid);
    res.sendSuccess({ result });
  } catch (error) {
    res.sendServerError({ message: error.message });
  }
};
