
const { getDB } = require("../config/database");
const { ObjectId } = require("mongodb");

// Obtener todos los medios con filtros opcionales
async function obtenerMedios(req, res) {
  try {
    const { tipo, categoria } = req.query;

    const tiposPermitidos = [
      "libro",
      "audiolibro",
      "video",
      "musica"
    ];

    // Validar tipo
    if (tipo && !tiposPermitidos.includes(tipo)) {
      return res.status(400).json({
        mensaje: "Tipo de medio no válido",
        tiposPermitidos
      });
    }

    const db = getDB();

    const pipeline = [];

    // Filtrar por tipo si se proporcionó
    if (tipo) {
      pipeline.push({
        $match: { tipo }
      });
    }

    // Relacionar los medios con sus categorías
    pipeline.push({
      $lookup: {
        from: "categorias",
        localField: "categorias",
        foreignField: "_id",
        as: "categoriasInfo"
      }
    });

    // Filtrar por nombre de categoría si se proporcionó
    if (categoria) {
      pipeline.push({
        $match: {
          "categoriasInfo.nombre": categoria
        }
      });
    }

    // Seleccionar los campos de respuesta
    pipeline.push({
      $project: {
        titulo: 1,
        tipo: 1,
        autores: 1,
        genero: 1,
        anioPublicacion: 1,
        descripcion: 1,
        etiquetas: 1,
        detalles: 1,
        archivoId: 1,
        portadaId: 1,
        createdAt: 1,
        updatedAt: 1,
        categorias: "$categoriasInfo.nombre"
      }
    });

    // Ordenar por título
    pipeline.push({
      $sort: { titulo: 1 }
    });

    const medios = await db
      .collection("medios")
      .aggregate(pipeline)
      .toArray();

    res.status(200).json({
      total: medios.length,
      filtros: {
        tipo: tipo || null,
        categoria: categoria || null
      },
      medios
    });

  } catch (error) {
    console.error("Error al obtener medios:", error.message);

    res.status(500).json({
      mensaje: "Error al consultar los medios"
    });
  }
}

// Obtener un medio por su ID
async function obtenerMedioPorId(req, res) {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        mensaje: "El ID del medio no es válido"
      });
    }

    const db = getDB();

    const resultados = await db.collection("medios").aggregate([
      {
        $match: {
          _id: new ObjectId(id)
        }
      },
      {
        $lookup: {
          from: "categorias",
          localField: "categorias",
          foreignField: "_id",
          as: "categoriasInfo"
        }
      },
      {
        $project: {
          titulo: 1,
          tipo: 1,
          autores: 1,
          genero: 1,
          anioPublicacion: 1,
          descripcion: 1,
          etiquetas: 1,
          detalles: 1,
          archivoId: 1,
          portadaId: 1,
          createdAt: 1,
          updatedAt: 1,
          categorias: "$categoriasInfo.nombre"
        }
      }
    ]).toArray();

    if (resultados.length === 0) {
      return res.status(404).json({
        mensaje: "No se encontró el medio solicitado"
      });
    }

    res.status(200).json(resultados[0]);

  } catch (error) {
    console.error("Error al obtener el medio:", error.message);

    res.status(500).json({
      mensaje: "Error al consultar el medio"
    });
  }
}

module.exports = {
  obtenerMedios,
  obtenerMedioPorId
};
