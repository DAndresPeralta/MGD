import productService from "../models/product.model.js";
import CustomRouter from "./router.js";

// AGREGAR PAGINATE,respuestas especiales como "sin productos almacenados"
export default class ProductRouter extends CustomRouter {
  init() {
    this.get("/product", async (req, res) => {
      try {
        const result = await productService.find();
        return res.status(201).send({
          status: "ok",
          result,
        });
      } catch (error) {
        return res.status(500).json({ msg: "Error" });
      }
    });

    this.get("/product/:id", async (req, res) => {
      try {
        const pid = req.params.id;
        const result = await productService.findById({ _id: pid });
        return res.status(201).send({
          status: "ok",
          result,
        });
      } catch (error) {
        return res.status(500).json({ msg: "Error" });
      }
    });

    this.post("/product", async (req, res) => {
      try {
        const { code, product, brand, weight, stock, obs } = req.body;
        const role = stock > 0 ? true : false;
        const result = await productService.create({
          code,
          product,
          brand,
          weight,
          stock,
          role,
          obs,
        });
        return res.status(201).send({
          status: "ok",
          message: "Producto agregado",
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error" });
      }
    });

    this.put("/product/:id", async (req, res) => {
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
        const extractedProduct = await productService.findOne({ _id: pid });
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
              : (extractedProduct.role =
                  extractedProduct.stock > 0 ? true : false);
          extractedProduct.obs =
            updatedProduct.obs !== undefined
              ? updatedProduct.obs
              : extractedProduct.obs;

          let result = await productService.updateOne(
            { _id: pid },
            extractedProduct
          );
          return res.status(201).send({
            status: "ok",
            message: "Producto modificado",
          });
        }
      } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error" });
      }
    });

    this.delete("/product/:id", async (req, res) => {
      try {
        const pid = req.params.id;
        const productToDelete = await productService.deleteOne({ _id: pid });
        return res.status(201).send({
          status: "ok",
          message: "Producto eliminado",
        });
      } catch (error) {
        return res.status(500).json({ msg: "Error" });
      }
    });
  }
  // Hacer Delete
}
