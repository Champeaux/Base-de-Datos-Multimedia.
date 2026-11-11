# Base de Datos Multimedia - Biblioteca Centralizada

## Problema
La biblioteca tiene dificultades para organizar, buscar y dar acceso eficiente a sus recursos multimedia.

## Solucion
Una BDM en MongoDB que integra en una sola plataforma centralizada libros, audiolibros, videos y musica, con metadatos detallados y busqueda avanzada.

## Estructura
- **Base:** biblioteca_multimedia
- **Coleccion:** medios
- **Campos:** titulo, tipo, autor, genero, anio_publicacion, paginas, duracion_minutos, descripcion, etiquetas, archivo_url, caratula_url

Tipos: `libro`, `audiolibro`, `video`, `musica`

## Como usar

1. Copiar variables:

2. Levantar MongoDB:

3. Cargar datos de ejemplo:

4. Probar busquedas:

## Busquedas incluidas
- Por titulo, autor, genero, tipo
- Por etiqueta
- Por palabra clave (indice de texto)
- Por anio de publicacion

## Archivos
- `docker-compose.yml` - Servicio MongoDB 8.0
- `seed.js` - 5 medios de ejemplo
- `consultas.js` - Indices + 9 consultas
- `.env.example` - Plantilla de variables
