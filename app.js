// ****************** LADO "BACK" Ó "SERVIDOR" ********************
import express from "express";
import { engine } from "express-handlebars";
// Estas lineas lo que hacen es arreglar el error del enrutamiento necesario para utiliza __dirname
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import passport from "passport";
import flash from "connect-flash";
// Forma para importar funciones, metodos desde otro archivo js (router)
import routesUser from "./router/users.router.js";
import routesLogin from "./router/login.router.js";
import routesAuth from "./router/auth.router.js";
import ProductsRouter from "./router/products.router.js";
import ClientRouter from "./router/clients.router.js";
import OrderRouter from "./router/orders.router.js";
import routesView from "./router/views.router.js";
import initializePassport from "./config/passport.config.js";
import { passportCall, authorization } from "./utils/utils.js";
import config from "./config/config.js";
import cors from "cors";
import compressionMiddleware from "./config/compression.js";

// Server: Creamos el servidor
// Con los siguientes pasos los que hacemos es levantar un servidor.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = config.port;
const productRouter = new ProductsRouter();
const clientRouter = new ClientRouter();
const orderRouter = new OrderRouter();

// ***** SETTINGS *****
// Hago mi carpeta public estatica para poder acceder
const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));
// Config Handlebars
app.engine(
  "handlebars",
  engine({
    extname: ".handlebars",
    defaultLayout: "main",
    partialsDir: __dirname + "/views/partials",
  })
);
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
// Con esta config puedo leer por consola los json que envie o reciba. Sino lo pongo me saldria todo com undefined
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("msg"));
app.use(flash());
app.use(passport.initialize());
initializePassport();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET, POST",
    credentials: true,
  })
);

mongoose
  .connect(config.mongoUrl)
  .then(() => {
    console.log("Conectado a la base de datos");
  })
  .catch((error) => {
    console.log("Error al conectar con la base de datos");
  });

// ***** ROUTES *****
//! Esto con HTML index
// !app.get("/", (req, res) => res.sendFile(__dirname + "/pages/singup.html"));

//? Esto es HANDLEBARS
// Incluimos el middleware auth con session. Ya que solo el administrador puede ingresar a esta seccion.
// app.get("/index", passportCall("jwt"), authorization("ADMIN"), (req, res) => {
//   res.render("admin");
// });

// app.get("/", (req, res) => {
//   res.render("index");
// });

// app.get(
//   "/user",
//   passportCall("jwt"),
//   authorization("USER", "ADMIN"),
//   (req, res) => {
//     res.render("user");
//   }
// );

// app.get("/addProduct", (req, res) => {
//   res.render("addProduct");
// });

// Configuro compressio Brotli
app.use(compressionMiddleware);

// VIEWS
app.use("/", routesView);
// Al presionar "registrar" en la pagina, se envia mediante fetch un metodo post que se comunica, en el back, con "api/register", este a su vez se comunica con el router-
app.use("/api", routesUser);
app.use("/api", routesLogin);
app.use("/api", routesAuth);
// Productos
app.use("/api", productRouter.getRouter());
// Clientes
app.use("/api", clientRouter.getRouter());
// Ordenes
app.use("/api", orderRouter.getRouter());

app.listen(PORT, () => {
  console.log("Server running on port: ", PORT);
});
