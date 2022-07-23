const passport = require("passport");

const { Router } = require("express");

// importo el controlador para todas estas rutas
const serverController = require("../controllers/serverController");

// creo la instancia de Router
const router = Router();

// mis endpoints
router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/failedRegister" }),
  serverController.register
);
router.get("/failedRegister", serverController.failedRegister);

router.post(
  "/login",

  passport.authenticate("login", { failureRedirect: "/failedLogin" }),
  serverController.login
);
router.get("/failedLogin", serverController.failedLogin);

router.get("/logout", serverController.logout);

router.get("/currentSession", serverController.currentSession);

router.get("/info", serverController.serverInfo);

module.exports = router;
