// Consultas - Biblioteca Multimedia
db = db.getSiblingDB("biblioteca_multimedia");

// 1. Indices para que la busqueda sea rapida
db.medios.createIndex({ titulo: "text", descripcion: "text", autor: "text", etiquetas: "text" });
db.medios.createIndex({ tipo: 1 });
db.medios.createIndex({ genero: 1 });
db.medios.createIndex({ etiquetas: 1 });

// 2. Ver todo
print("--- TODOS ---");
db.medios.find({}, {titulo: 1, tipo: 1, autor: 1}).pretty();

// 3. Buscar por titulo (aunque escribas parte)
print("--- POR TITULO: Quijote ---");
db.medios.find({ titulo: /Quijote/i }).pretty();

// 4. Buscar por autor
print("--- POR AUTOR: Garcia Marquez ---");
db.medios.find({ autor: /Garcia/i }).pretty();

// 5. Buscar por genero
print("--- POR GENERO: Novela ---");
db.medios.find({ genero: "Novela" }).pretty();

// 6. Buscar por tipo
print("--- SOLO LIBROS ---");
db.medios.find({ tipo: "libro" }).pretty();

// 7. Buscar por etiqueta
print("--- POR ETIQUETA: clasico ---");
db.medios.find({ etiquetas: "clásico" }).pretty();

// 8. Busqueda por palabras clave (titulo, descripcion, autor, etiquetas)
print("--- PALABRA CLAVE: bolero ---");
db.medios.find({ $text: { $search: "bolero" } }).pretty();

// 9. Buscar por anio
print("--- DESPUES DEL 1940 ---");
db.medios.find({ anio_publicacion: { $gte: 1940 } }, {titulo: 1, anio_publicacion: 1}).pretty();
