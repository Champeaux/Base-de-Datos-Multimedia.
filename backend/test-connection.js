
const {
  connectDB,
  getDB,
  getGridFSBucket,
  closeDB
} = require("./src/config/database");

async function testConnection() {
  try {
    await connectDB();

    const db = getDB();
    const bucket = getGridFSBucket();

    // Comprobar las colecciones existentes
    const collections = await db.listCollections().toArray();

    console.log("\nColecciones encontradas:");

    collections.forEach((collection) => {
      console.log(`- ${collection.name}`);
    });

    // Comprobar que GridFS está disponible
    console.log("\nGridFS disponible:", Boolean(bucket));

    // Comprobar cantidad de medios
    const totalMedios = await db.collection("medios").countDocuments();

    console.log("Total de medios:", totalMedios);

  } catch (error) {
    console.error("Falló la prueba:", error.message);
    process.exitCode = 1;
  } finally {
    await closeDB();
  }
}

testConnection();
