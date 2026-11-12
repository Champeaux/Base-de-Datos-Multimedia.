
const express = require("express");

const {
  obtenerCategorias
} = require("../controllers/categorias.controller");

const router = express.Router();

// GET /api/categorias
router.get("/", obtenerCategorias);

module.exports = router;
