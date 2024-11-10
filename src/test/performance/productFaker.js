import { faker } from "@faker-js/faker";
import express from "express";

const router = express.Router();

router.get("/test/product", (req, res) => {
  let code = faker.number.int();
  let product = faker.commerce.productName();
  let brand = faker.company.name();
  let weight = faker.number.int();
  let stock = faker.number.int();
  let role = true;
  let obs = faker.lorem.sentence();

  res.json({
    code,
    product,
    brand,
    weight,
    stock,
    role,
    obs,
  });
});

export default router;
