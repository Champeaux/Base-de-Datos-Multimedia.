
const express = require("express");
const cors = require("cors");
const mediosRoutes = require("./routes/medios.routes");
const { connectDB, closeDB } = require("./config/database");

const app = express();
const PORT = process.env.PORT || 3000;
const categoriasRoutes = require("./routes/categorias.routes");
// Middlewares
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use("/api/categorias", categoriasRoutes);
app.use("/api/medios", mediosRoutes);

// Ruta inicial
app.get("/", (req, res) => {
  res.json({
    mensaje: "API de Biblioteca Multimedia",
    estado: "Funcionando",
    version: "1.0.0"
  });
});

// Ruta de comprobación de salud
app.get("/api/health", (req, res) => {
  res.json({
    estado: "OK",
    mensaje: "El servidor está funcionando correctamente"
  });
});

// Iniciar servidor después de conectar MongoDB
async function startServer() {
  try {
    await connectDB();

    const server = app.listen(PORT, () => {
      console.log(`Servidor iniciado en http://localhost:${PORT}`);
    });

    async function shutdown() {
      console.log("\nCerrando servidor...");

      server.close(async () => {
        await closeDB();
        console.log("Conexión con MongoDB cerrada.");
        process.exit(0);
      });
    }

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);

  } catch (error) {
    console.error("No se pudo iniciar el servidor:", error.message);
    await closeDB().catch(() => {});
    process.exit(1);
  }
}

startServer();
