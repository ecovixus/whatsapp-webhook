# Sueño de 15 – Sitio web corporativo

Este proyecto añade una estructura base de front-end para la marca **Sueño de 15**, ideal para trabajar desde Visual Studio Code o Visual Studio con herramientas web.

## Estructura de carpetas

```
public/
├── assets/
│   ├── fonts/
│   └── images/
│       ├── *.svg (marcadores temporales)
│       └── README.md
├── index.html
├── scripts/
│   └── main.js
└── styles/
    └── main.css
```

## Contenido

- **index.html**: página principal con secciones para vestidos de 15 años y vestidos de gala.
- **styles/main.css**: hoja de estilos con paleta dorada y diseño juvenil.
- **scripts/main.js**: pequeños detalles de interacción (scroll suave y año dinámico en el pie de página).
- **assets/images**: incluye marcadores SVG que puedes reemplazar con el logo y las fotografías finales. Consulta el README de la carpeta para los detalles.

## Cómo ejecutar

1. Instala las dependencias del proyecto (si aún no lo has hecho):
   ```bash
   npm install
   ```
2. Inicia el servidor Express que expone la carpeta `public` como contenido estático:
   ```bash
   npm start
   ```
3. Abre `http://localhost:3000` en tu navegador para ver el sitio.

## Notas

- Puedes personalizar los textos y las rutas de imagen según la sesión fotográfica de tu marca.
- Se recomienda optimizar las imágenes antes de subirlas para mejorar el rendimiento del sitio.
