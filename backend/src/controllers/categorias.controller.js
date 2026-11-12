
const { getDB } = require("../config/database");

async function obtenerCategorias(req, res) {
  try {
    const db = getDB();

    const categorias = await db
      .collection("categorias")
      .find({})
      .sort({ nombre: 1 })
      .toArray();

    res.status(200).json({
      total: categorias.length,
      categorias
    });

  } catch (error) {
    console.error("Error al obtener categorías:", error.message);

    res.status(500).json({
      mensaje: "Error al consultar las categorías"
    });
  }
}

module.exports = {
  obtenerCategorias
};
