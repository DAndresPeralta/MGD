export function auth(req, res, next) {
  if (
    req.isAuthenticated() &&
    req.user.userName === "devdap" &&
    req.user.role === true
  ) {
    return next();
  }

  // En caso de no tener autorizacion redirecciono a la ruta raiz(Login).
  return res.redirect("/");
}

export function auth2(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  // En caso de no tener autorizacion redirecciono a la ruta raiz(Login).
  return res.redirect("/");
}

// export default { auth, auth2 };
