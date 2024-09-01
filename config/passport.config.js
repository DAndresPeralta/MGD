import express from "express";
import passport from "passport";
import local from "passport-local";
import jwt, { ExtractJwt } from "passport-jwt";
import userService from "../models/user.model.js";
import {
  cookieExtractor,
  createHash,
  isValidPassword,
} from "../utils/utils.js";

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "userName" },
      async (req, userName, password, done) => {
        const { firstName, lastName, email, role } = req.body;
        try {
          let user = await userService.findOne({ userName: userName });
          if (user) {
            return done(null, false, {
              message: "El usuario ya esta registrado",
            });
          }
          const newUser = {
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            email: email,
            role: role.toUpperCase(),
            password: await createHash(password),
          };
          let result = await userService.create(newUser);
          return done(null, result);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "userName" },
      async (userName, password, done) => {
        try {
          const userCheck = await userService.findOne({ userName: userName });
          if (!userCheck) {
            return done(null, false, { message: "Usuario inexistente" });
          }

          const passwordCheck = await isValidPassword(
            password,
            userCheck.password
          );

          if (!passwordCheck) {
            return done(null, false, { message: "Contraseña incorrecta" });
          }
          return done(null, userCheck, { message: "Bienvenido" });
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: "msg",
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

// passport.serializeUser((user, done) => {
//   done(null, user._id);
// });

// passport.deserializeUser(async (id, done) => {
//   let user = await userService.findById(id);
//   done(null, user);
// });

export default initializePassport;
