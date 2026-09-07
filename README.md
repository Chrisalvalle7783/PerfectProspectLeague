# Perfect Prospect League App

Base móvil real para iOS y Android creada con React Native + Expo SDK 57.

## Qué incluye esta primera versión

- Pantalla de entrada.
- Inicio con diseño oscuro/profesional inspirado en la referencia aprobada.
- Categorías 8U a 17U.
- Próximos juegos y resultados.
- Calendario / Juegos.
- Equipos.
- Jugadores.
- Standings y estadísticas.
- Sección Más.
- Sin sección de líderes.
- Los perfiles de jugadores se muestran como contenido administrado por la liga; no existe creación pública de perfiles.

## Ejecutar

Requiere Node.js compatible con Expo SDK 57.

```bash
npm install
npx expo start
```

## Publicación en tiendas

El proyecto ya incluye `eas.json` y los identificadores:

- iOS: `com.perfectprospect.league`
- Android: `com.perfectprospect.league`

Antes de publicar hay que añadir los assets definitivos (logo, icono 1024x1024, splash), autenticación, base de datos/backend y credenciales de App Store Connect / Google Play Console.

Luego se configura EAS:

```bash
npm install -g eas-cli
eas login
eas build:configure
eas build --platform all --profile production
```

No publiques todavía esta versión de muestra: primero hay que conectar datos reales, seguridad y panel administrativo.
