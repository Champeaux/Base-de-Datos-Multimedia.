// Base: biblioteca_multimedia - Coleccion: medios
db = db.getSiblingDB("biblioteca_multimedia");
db.medios.drop();

db.medios.insertMany([
  {
    titulo: "Cien años de soledad",
    tipo: "libro",
    autor: "Gabriel García Márquez",
    genero: "Realismo mágico",
    anio_publicacion: 1967,
    paginas: 471,
    duracion_minutos: null,
    descripcion: "Historia de la familia Buendía en Macondo.",
    etiquetas: ["clásico", "latinoamérica", "novela"],
    archivo_url: "almacenamiento/libros/cien_anios.pdf",
    caratula_url: "almacenamiento/caratulas/cien_anios.jpg"
  },
  {
    titulo: "El Principito",
    tipo: "audiolibro",
    autor: "Antoine de Saint-Exupéry",
    genero: "Fábula",
    anio_publicacion: 1943,
    paginas: null,
    duracion_minutos: 95,
    descripcion: "Un piloto conoce a un pequeño príncipe.",
    etiquetas: ["infantil", "filosofía", "clásico"],
    archivo_url: "almacenamiento/audiolibros/principito.mp3",
    caratula_url: "almacenamiento/caratulas/principito.jpg"
  },
  {
    titulo: "Introducción a Bases de Datos",
    tipo: "video",
    autor: "Prof. Champeaux",
    genero: "Educativo",
    anio_publicacion: 2024,
    paginas: null,
    duracion_minutos: 45,
    descripcion: "Qué es una BD, tipos y ejemplos con MongoDB.",
    etiquetas: ["educativo", "mongodb", "clase"],
    archivo_url: "almacenamiento/videos/intro_bd.mp4",
    caratula_url: "almacenamiento/caratulas/intro_bd.jpg"
  },
  {
    titulo: "Bésame Mucho",
    tipo: "música",
    autor: "Consuelo Velázquez",
    genero: "Bolero",
    anio_publicacion: 1940,
    paginas: null,
    duracion_minutos: 4,
    descripcion: "Clásico bolero mexicano.",
    etiquetas: ["bolero", "méxico", "romántica"],
    archivo_url: "almacenamiento/musica/besame_mucho.mp3",
    caratula_url: "almacenamiento/caratulas/besame_mucho.jpg"
  },
  {
    titulo: "Don Quijote de la Mancha",
    tipo: "libro",
    autor: "Miguel de Cervantes",
    genero: "Novela",
    anio_publicacion: 1605,
    paginas: 1072,
    duracion_minutos: null,
    descripcion: "Las aventuras de Don Quijote y Sancho Panza.",
    etiquetas: ["clásico", "español", "novela"],
    archivo_url: "almacenamiento/libros/quijote.pdf",
    caratula_url: "almacenamiento/caratulas/quijote.jpg"
  }
]);

print("Listo: " + db.medios.countDocuments() + " medios insertados");
