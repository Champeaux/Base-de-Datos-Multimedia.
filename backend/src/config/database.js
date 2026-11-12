
const { MongoClient, GridFSBucket } = require("mongodb");
const dotenv = require("dotenv");
const path = require("path");

// Cargar las variables del .env ubicado en la raíz del proyecto
dotenv.config({
  path: path.resolve(__dirname, "../../../.env")
});

const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

const DATABASE_NAME = "biblioteca_multimedia";

if (!MONGO_USER || !MONGO_PASSWORD) {
  throw new Error("Faltan las credenciales de MongoDB en el archivo .env");
}

// Construir la URI sin imprimir las credenciales
const encodedUser = encodeURIComponent(MONGO_USER);
const encodedPassword = encodeURIComponent(MONGO_PASSWORD);

const MONGO_URI =
  `mongodb://${encodedUser}:${encodedPassword}` +
  `@127.0.0.1:27017/${DATABASE_NAME}?authSource=admin`;

const client = new MongoClient(MONGO_URI);

let database;
let bucket;

async function connectDB() {
  try {
    await client.connect();

    database = client.db(DATABASE_NAME);

    // Inicializar el bucket de GridFS
    bucket = new GridFSBucket(database, {
      bucketName: "fs"
    });

    console.log("MongoDB conectado correctamente.");
    console.log(`Base de datos: ${DATABASE_NAME}`);
    console.log("GridFSBucket inicializado.");

    return database;
  } catch (error) {
    console.error("Error al conectar con MongoDB:", error.message);
    throw error;
  }
}

function getDB() {
  if (!database) {
    throw new Error("La base de datos todavía no está conectada.");
  }

  return database;
}

function getGridFSBucket() {
  if (!bucket) {
    throw new Error("GridFS todavía no está inicializado.");
  }

  return bucket;
}

async function closeDB() {
  await client.close();
  database = undefined;
  bucket = undefined;
}

module.exports = {
  connectDB,
  getDB,
  getGridFSBucket,
  closeDB
};
