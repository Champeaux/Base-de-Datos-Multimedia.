const express = require("express");

const {
  obtenerMedios,
  obtenerMedioPorId
} = require("../controllers/medios.controller");

const router = express.Router();

// Obtener todos los medios
router.get("/", obtenerMedios);

// Obtener un medio por su ID
router.get("/:id", obtenerMedioPorId);

module.exports = router;
