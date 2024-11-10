import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";

const PRIVATE_KEY = "msg";

export async function createHash(password) {
  const salt = 5;
  try {
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error("Error al hashear la contraseña:", error);
    throw error;
  }
}

export async function isValidPassword(password, hashedPassword) {
  try {
    const isValid = await bcrypt.compare(password, hashedPassword);
    return isValid;
  } catch (error) {
    console.error("Error al hashear la contraseña:", error);
    throw error;
  }
}

export const generateToken = (user) => {
  if (!user) return;
  try {
    const token = jwt.sign(user, PRIVATE_KEY, { expiresIn: "24h" });
    return token;
  } catch (error) {
    console.error("Error al generar el token:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export const checkToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).send({ error: "Not Tokens Found" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
      if (error) {
        return res.status(401).send({ error: "Expired Token" });
      }
      req.user.credentials.user;
      next();
    });
  } catch (error) {
    console.error("Unexpected error during token verification:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  return token;
};

export const passportCall = (Strategy) => {
  return async (req, res, next) => {
    passport.authenticate(Strategy, (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        return res
          .status(401)
          .send({ error: info.messages ? info.messages : info.toString() });
      }
      req.user = user;
      next();
    })(req, res, next);
  };
};

export const authorization = (...role) => {
  return async (req, res, next) => {
    if (!req.user) return res.status(401).send({ error: { Anauthorized } });
    // if (req.user.user.role != role.toUpperCase())
    //   return res.status(401).send({ error: "No Permissions" });

    if (!role.includes(req.user.user.role.toUpperCase()))
      return res.status(401).send({ error: "No Permissions" });
    next();
  };
};

export const handlePolicies = (policies) => (req, res) => {
  if (policies[0] === "PUBLIC") return next();
  const authHeaders = req.headers.authorization;
  if (!authHeaders) {
    return res.status(401).send({ status: "error", error: "No autorizado" });
  }
  let user = checkToken();
  if (!policies.includes(user.role.toUpperCase())) {
    return res.status(401).send({ status: "error", error: "No autorizado" });
  }
  req.user = user;
  next();
};
