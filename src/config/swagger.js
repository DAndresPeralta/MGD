import swaggerJsdoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const swaggerOptions = {
  definition: {
    openapi: "3.0.1", //Sirve para especificar las reglas específicas que seguirá la openapi generada.
    info: {
      title: "Documentacion API de MGD (Milessima Sistema de Gestión)",
      description: "API pensada para la clase Swagger",
    },
  },
  apis: [`${__dirname}/../docs/**/*.yaml`],
};

export const swaggerDocs = swaggerJsdoc(swaggerOptions);
