const { Router } = require("express");

// importo el controlador para todas estas rutas
const apiController = require("../controllers/apiController");

// creo la instancia de Router
const router = Router();

// mis endpoints

router.get("/randoms", apiController.bigRandom);

module.exports = router;
