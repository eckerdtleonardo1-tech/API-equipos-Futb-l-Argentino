# Flujo interno de la API — Como funciona por dentro

Este documento explica **como esta armada la API**: que hace cada archivo, como se conectan entre si, que recorrido hace una peticion desde que llega hasta que se responde, y **por que** se organizo asi.

> Para saber *que devuelve* cada endpoint (campos y tipos de datos) ver el [README.md](README.md). Aca el foco esta en el *como* y el *por que*.

---

## 1. La idea general: separar responsabilidades por capas

El proyecto sigue una organizacion en capas (parecida al patron **MVC**, Modelo–Vista–Controlador, pero sin vistas porque la API responde JSON):

```
Cliente (navegador / Postman)
        │  peticion HTTP
        ▼
┌────────────────────┐
│ App.js             │  Arranca el servidor, aplica middlewares globales y "monta" las rutas
└────────┬───────────┘
         ▼
┌────────────────────┐
│ routes/            │  Decide QUE funcion atiende cada URL + metodo (GET, POST, PUT, DELETE)
└────────┬───────────┘
         ▼
┌────────────────────┐
│ utils/validaciones │  (solo POST y PUT) Revisa que los datos enviados sean correctos
└────────┬───────────┘
         ▼
┌────────────────────┐
│ controlador/       │  La logica: consulta la base, arma la respuesta, maneja el 404
└────────┬───────────┘
         ▼
┌────────────────────┐
│ modelo/            │  Describe las tablas (Club, Torneo, Partido) y sus relaciones
└────────┬───────────┘
         ▼
┌────────────────────┐
│ src/db.js          │  La conexion a la base de datos SQLite (futbol.sqlite)
└────────────────────┘

Si algo falla en cualquier capa ──► utils/error.middleware.js arma la respuesta de error
```

**Por que asi:** cada archivo tiene un solo trabajo. Si queres cambiar una URL tocas solo `routes/`; si queres cambiar una regla de validacion tocas solo `validaciones.js`; si cambias de SQLite a MySQL tocas solo `src/db.js`. Asi un cambio no rompe todo lo demas y el codigo es mas facil de leer y probar.

---

## 2. Que hace cada archivo

### Raiz del proyecto

| Archivo | Que hace | Por que existe |
|---|---|---|
| `App.js` | Punto de entrada. Crea la app de Express, activa CORS y la lectura de JSON, sirve los escudos, conecta las rutas, registra el manejador de errores, sincroniza la base y levanta el servidor en el puerto 3000. | Centraliza la configuracion en un solo lugar. Es lo que ejecuta `npm start` (`node App.js`). |
| `seed.js` | Borra y recrea las tablas (`sync({ force: true })`) y carga los 30 clubes, 4 torneos y 17 partidos. | Para tener datos de arranque sin cargarlos a mano. Se corre una vez con `node seed.js` (o cuando quieras "resetear" la base). |
| `generar_token.js` | Script suelto que imprime un token JWT de prueba (valido 1 hora). | Utilidad de desarrollo para probar autenticacion. No lo usa la API. |
| `futbol.sqlite` | El archivo de la base de datos. | SQLite guarda toda la base en un unico archivo: no hace falta instalar un servidor de base de datos. |
| `package.json` | Dependencias y scripts (`start`, `dev`). Tiene `"type": "module"`. | `"type": "module"` permite usar `import`/`export` en lugar de `require`. |
| `.env.example` | Plantilla de variables de entorno (`PORT`, `JWT_SECRET`, `ADMIN_USER`, `ADMIN_PASS`). | Para no escribir secretos en el codigo. Se copia como `.env`. |

### `src/db.js` — La conexion

Crea **una sola instancia** de Sequelize apuntando a `./futbol.sqlite` y la exporta. Todos los modelos importan esta misma instancia.

**Por que:** si cada modelo creara su propia conexion habria varias conexiones abiertas al mismo archivo. Compartir una sola garantiza que todos trabajen sobre la misma base y que `sequelize.sync()` en `App.js` cree todas las tablas juntas.

### `modelo/` — Las tablas

| Archivo | Tabla | Contenido |
|---|---|---|
| `club.model.js` | `clubes` | Datos del club. Los campos complejos (`equipaciones`, `sponsors`, `trofeos`, `posicion_liga`, `proximos_partidos`, `competencias_activas`) son de tipo `JSON`. |
| `torneo.model.js` | `torneos` | Nombre, año, estado, ultimo campeon, si esta activo. |
| `partido.model.js` | `partidos` | Fecha y hora, estadio, goles, estado. **Aca se definen las relaciones**. |

**Las relaciones** (definidas en `partido.model.js`):

```
Torneo 1 ──── N Partido        (partido.torneo_id    → torneos.id)
Club   1 ──── N Partido        (partido.local_id     → clubes.id)   alias "Local"
Club   1 ──── N Partido        (partido.visitante_id → clubes.id)   alias "Visitante"
```

Un partido tiene **dos** referencias al mismo modelo `Club` (local y visitante), por eso se usan los alias `Local` y `Visitante`: sin alias Sequelize no sabria cual de las dos claves usar. Gracias a esto, los controladores pueden pedir `include: [{ model: Club, as: 'Local' }]` y Sequelize trae los datos del club con un JOIN automatico, sin escribir SQL.

**Por que campos JSON en Club:** datos como la tabla de posiciones o las equipaciones son "fichas" que siempre se leen enteras junto al club. Guardarlos como JSON evita crear muchas tablas chicas extra. La contra es que no se pueden filtrar facilmente por esos campos (por eso la tabla de posiciones se ordena en JavaScript, no en la base).

**Por que las relaciones estan en `partido.model.js`:** `Partido` es el que importa a `Club` y `Torneo`. Si las relaciones estuvieran en `club.model.js`, este tendria que importar `partido.model.js` y se armaria una importacion circular. Por eso `App.js` importa explicitamente los tres modelos: para asegurarse de que el codigo de las relaciones se ejecute antes de atender peticiones.

### `routes/` — Las URLs

Cada archivo crea un `Router` de Express y asocia URL + metodo → funcion del controlador. `App.js` los monta con un prefijo:

| Prefijo (en `App.js`) | Archivo de rutas | Controlador |
|---|---|---|
| `/clubes` | `routes/club.route.js` | `controlador/club.controlador.js` |
| `/torneos` | `routes/torneo.route.js` | `controlador/torneo.controlador.js` |
| `/partidos` | `routes/partido.route.js` | `controlador/partido.controlador.js` |
| `/auth` | `routes/auth.route.js` | `controlador/auth.controlador.js` |
| `/posiciones` | (directo en `App.js`) | `obtenerPosiciones` de `torneo.controlador.js` |
| `/escudos` | (directo en `App.js`, `express.static`) | — sirve archivos de `public/escudos/` |

**Por que prefijos:** dentro de `club.route.js` las rutas se escriben como `/` y `/:id`, y al montarlas en `/clubes` quedan `/clubes` y `/clubes/:id`. Si mañana quisieras versionar la API (`/api/v1/clubes`) solo cambias el prefijo en `App.js`.

### `controlador/` — La logica

Cada funcion recibe `(req, res, next)`:
- `req` trae los datos de la peticion: `req.params` (el `:id`), `req.query` (lo que va despues de `?`), `req.body` (el JSON enviado).
- `res` se usa para responder: `res.json(...)`, `res.status(404).json(...)`.
- `next(error)` pasa cualquier error inesperado al manejador de errores.

Todas siguen el mismo esquema `try { ... } catch (error) { next(error) }`, asi ningun error deja la peticion colgada.

### `utils/` — Piezas reutilizables

| Archivo | Que hace |
|---|---|
| `validaciones.js` | Define con **Zod** el esquema de un club (`clubSchema`) y la version parcial para editar (`clubUpdateSchema = clubSchema.partial()`, donde todos los campos son opcionales). Exporta los middlewares `validarClub` y `validarActualizacionClub`. |
| `error.middleware.js` | `manejadorErrores`: recibe cualquier error que llegue por `next(error)` y responde 400 (errores de validacion de Zod o Sequelize, nombre duplicado) o 500 (todo lo demas). |
| `auth.middleware.js` | `verificarToken`: revisa el encabezado `Authorization: Bearer <token>`. **Ojo: hoy no esta aplicado a ninguna ruta** (ver seccion 6). |

**Por que validar en un middleware aparte:** el controlador recibe datos ya revisados y no se llena de `if`. Y el mismo esquema sirve para crear y editar.

---

## 3. Que pasa al arrancar el servidor (`npm start`)

Orden real de ejecucion de `App.js`:

1. **Se resuelven los `import`.** En los modulos ES todos los `import` se ejecutan *antes* que el resto del archivo. Al cargarse:
   - `src/db.js` crea la conexion.
   - Los tres modelos definen sus tablas; `partido.model.js` registra las relaciones.
   - Las rutas y controladores quedan listos.
2. `dotenv.config()` lee el archivo `.env` (si existe) y carga sus variables en `process.env`.
3. Se crea `app = express()` y se registran, **en este orden**:
   1. `cors()` — permite que una pagina web de otro dominio consuma la API.
   2. `express.json()` — convierte el cuerpo JSON de POST/PUT en `req.body`.
   3. `/escudos` — archivos estaticos.
   4. Las rutas `/auth`, `/clubes`, `/torneos`, `/partidos`, `/posiciones` y `/`.
   5. `manejadorErrores` — **al final**, porque Express solo le pasa errores a los middlewares registrados *despues* de las rutas.
4. `sequelize.sync({ force: false })` crea las tablas que no existan **sin borrar datos**.
5. Recien cuando la base esta lista, `app.listen(3000)` empieza a aceptar peticiones.

**Por que el orden importa:** si `express.json()` estuviera despues de las rutas, `req.body` llegaria vacio al POST. Si `manejadorErrores` estuviera antes, nunca recibiria errores. Y levantar el servidor despues de `sync` evita atender peticiones sin tablas.

**Diferencia entre `seed.js` y `App.js`:** `seed.js` usa `force: true` (borra y recrea todo) y `App.js` usa `force: false` (respeta lo que ya hay). Por eso los cambios que hagas con POST/PUT/DELETE se mantienen al reiniciar el servidor, pero se pierden si volves a correr el seed.

---

## 4. Recorrido completo de una peticion (ejemplos)

### Ejemplo A: `GET /clubes?zona=A`

```
1. Llega GET /clubes?zona=A
2. cors() y express.json() dejan pasar (no hay cuerpo)
3. App.js: el prefijo /clubes coincide → entra a club.route.js
4. club.route.js: router.get('/') coincide → llama a obtenerClubes
5. obtenerClubes:
     - lee req.query.zona = "A"
     - arma el filtro { zona_clausura: 'A' }
     - Club.findAll({ where, order: nombre ASC })  ──► Sequelize genera el SELECT ──► SQLite
     - a cada club le pasa formatearClub() para completar la URL del escudo
     - res.json({ total, fecha_actualizacion, clubes })
6. El cliente recibe 200 OK con el JSON
```

### Ejemplo B: `PUT /clubes/1` con un dato invalido

```
1. Llega PUT /clubes/1 con body { "cantidad_socios": "mucho" }
2. express.json() convierte el cuerpo en req.body
3. club.route.js: router.put('/:id', validarActualizacionClub, actualizarClub)
4. validarActualizacionClub: Zod detecta que cantidad_socios no es number → lanza ZodError → next(error)
5. actualizarClub NUNCA se ejecuta (la base no se toca)
6. manejadorErrores: err.name === 'ZodError' → responde 400
```

### Ejemplo C: `GET /clubes/999` (no existe)

```
1. club.route.js → obtenerClubPorId
2. Club.findByPk(999) devuelve null
3. El controlador responde directamente 404 { "mensaje": "Club no encontrado" }
   (no pasa por manejadorErrores: "no encontrado" es un resultado esperado, no un error del servidor)
```

---

## 5. Cada endpoint por dentro

### Clubes — `routes/club.route.js` → `controlador/club.controlador.js`

| Endpoint | Middlewares | Funcion | Que hace por dentro |
|---|---|---|---|
| `GET /clubes` | — | `obtenerClubes` | Si viene `?zona` filtra por `zona_clausura` (pasa a mayuscula). Si viene `?buscar` usa `LIKE %texto%` sobre el nombre. Ordena por nombre y completa `escudo_url`. |
| `GET /clubes/:id` | — | `obtenerClubPorId` | `Club.findByPk(id)`. 404 si no existe. Devuelve la ficha completa con `escudo_url` completa. |
| `GET /clubes/:id/proximos-partidos` | — | `obtenerProximosPartidos` | Busca el club (404 si no existe). Despues busca en `partidos` los que tengan `estado = 'PROGRAMADO'` y donde el club sea local **o** visitante (`Op.or`), incluyendo `Local`, `Visitante` y `Torneo`. Para cada partido calcula si el club juega de local o visitante y quien es el rival. Devuelve dos listas: la guardada en el campo JSON del club (`proximos_partidos_detallados`) y la calculada desde la tabla de partidos (`partidos_programados_calendario`). |
| `GET /clubes/:id/competencias` | — | `obtenerCompetenciasClub` | Busca el club y devuelve solo los campos de competencias: posicion en la liga, estado en cada copa y proximos partidos. |
| `POST /clubes` | `validarClub` | `crearClub` | Zod valida el cuerpo completo. Luego revisa si ya hay un club con ese nombre (400). Si no, `Club.create(req.body)` y responde **201**. |
| `PUT /clubes/:id` | `validarActualizacionClub` | `actualizarClub` | Zod valida solo los campos enviados. Busca el club (404). Si cambia el nombre, verifica que no lo use otro club (400). `club.update(req.body)` modifica solo esos campos y responde el club completo actualizado. |
| `DELETE /clubes/:id` | — | `eliminarClub` | Busca el club (404). Guarda el nombre, ejecuta `club.destroy()` y responde con el mensaje. |

**Por que el controlador revisa el nombre duplicado si la columna ya es `unique`:** la base igual lo rechazaria, pero chequearlo antes permite devolver un mensaje claro en español en vez de un error tecnico de SQLite.

**`formatearClub`:** en la base el escudo se guarda como ruta relativa (`/escudos/boca-juniors.svg`). Esta funcion le agrega el protocolo y el host de la peticion (`http://localhost:3000`). **Por que:** si la API se publica en otro dominio, las URLs se arman solas con el dominio correcto sin cambiar los datos.

### Torneos y posiciones — `routes/torneo.route.js` → `controlador/torneo.controlador.js`

| Endpoint | Funcion | Que hace por dentro |
|---|---|---|
| `GET /torneos` | `obtenerTorneos` | `Torneo.findAll` ordenado por año descendente. |
| `GET /torneos/:id` | `obtenerTorneoPorId` | `Torneo.findByPk`. 404 si no existe. |
| `GET /torneos/:id/posiciones` | `obtenerPosiciones` | Ver explicacion abajo. |
| `GET /posiciones` | `obtenerPosiciones` | La misma funcion, montada directo en `App.js`. Como no hay `:id`, usa `id || 1`: el torneo 1 (Clausura 2026). |
| `GET /torneos/:id/partidos` | `obtenerPartidosDeTorneo` | Verifica que el torneo exista y trae sus partidos con `Local` y `Visitante`, ordenados por fecha. |

**Como se arma la tabla de posiciones (`obtenerPosiciones`):**

1. Busca el torneo (404 si no existe).
2. Trae los clubes (filtrados por zona si viene `?zona`) con solo los atributos necesarios.
3. Los separa en Zona A y Zona B.
4. `formatoTabla` lee de cada club su campo JSON `posicion_liga`, arma una fila con puntos, partidos, goles, etc., agrega `clasificacion` (los 8 primeros: "Octavos de Final (Playoffs)") y ordena por `posicion`.

**Por que se calcula en JavaScript y no con SQL:** los numeros de la tabla estan dentro de un campo JSON, y SQLite no puede ordenar comodamente por un campo interno del JSON a traves de Sequelize. Con 30 clubes, hacerlo en memoria es instantaneo.

**Nota:** la tabla no se calcula a partir de los partidos jugados, sino que se lee de lo cargado en el seed. Cargar un resultado en `partidos` no cambia la tabla.

### Partidos — `routes/partido.route.js` → `controlador/partido.controlador.js`

| Endpoint | Funcion | Que hace por dentro |
|---|---|---|
| `GET /partidos` | `obtenerPartidos` | Acepta `?torneo_id=` opcional. Trae los partidos con `Local`, `Visitante` y `Torneo` (JOIN automatico gracias a las relaciones) ordenados por fecha. |
| `GET /partidos/:id` | `obtenerPartidoPorId` | Igual pero de un solo partido; de cada club trae tambien `presidente`. 404 si no existe. |

Partidos y torneos son de **solo lectura**: no tienen POST/PUT/DELETE, se cargan unicamente desde `seed.js`.

### Autenticacion — `routes/auth.route.js` → `controlador/auth.controlador.js`

| Endpoint | Funcion | Que hace por dentro |
|---|---|---|
| `POST /auth/login` | `login` | Recibe `{ username, password }`. Si falta alguno → 400. Si no coinciden con el usuario admin → 401. Si estan bien, firma un JWT con `jsonwebtoken` (valido 24 h) y lo devuelve como `"Bearer <token>"`. |

El usuario admin no esta en la base: se toma de las variables `ADMIN_USER` / `ADMIN_PASS` o, si no estan, usa `admin` / `futbol2026`.

### Escudos — `express.static` en `App.js`

`GET /escudos/boca-juniors.svg` no pasa por ningun controlador: Express busca el archivo en `public/escudos/` y lo envia tal cual. Si no existe responde 404. **Por que:** servir archivos es una tarea resuelta por Express; no hace falta logica propia.

---

## 6. Puntos a tener en cuenta (estado actual del codigo)

Estas son cosas que hoy funcionan distinto de lo que uno esperaria al leer el codigo. Estan documentadas para que no te sorprendan:

1. **El CRUD no esta protegido con token.** Existen `POST /auth/login` y `verificarToken` (`utils/auth.middleware.js`), pero el middleware no esta aplicado en ninguna ruta. Cualquiera puede crear, editar o borrar clubes sin loguearse. Para protegerlas habria que agregarlo en `club.route.js`, por ejemplo: `router.post('/', verificarToken, validarClub, crearClub)`.

2. **El `.env` no afecta al login ni al token.** `auth.controlador.js` y `auth.middleware.js` leen `process.env.JWT_SECRET` y las credenciales en el momento en que se importan, y eso ocurre *antes* de que se ejecute `dotenv.config()` en `App.js` (los `import` siempre van primero). Resultado: siempre se usan los valores por defecto (`secreto_futbol`, `admin` / `futbol2026`). `PORT` si funciona, porque se lee despues. Se soluciona usando `import 'dotenv/config'` como primera linea de `App.js`.

3. **Los errores de validacion vienen sin `detalles`.** El proyecto usa Zod 4, que guarda la lista de errores en `err.issues`; `error.middleware.js` lee `err.errors`, que en Zod 4 no existe. La respuesta 400 llega solo con `"mensaje"`. Se soluciona cambiando `err.errors` por `err.issues` en `error.middleware.js`.

4. **`escudo_url` no siempre es completa.** En `/clubes/:id/proximos-partidos` y `/clubes/:id/competencias` se devuelve la ruta relativa (`/escudos/...`) porque esos controladores no usan `formatearClub`. Lo mismo pasa con los escudos de los clubes dentro de `/partidos`.

5. **La clave de la zona cambia segun el filtro.** `/posiciones` devuelve `zona_a` / `zona_b`, pero con `?zona=A` devuelve `zona_A` (en mayuscula).

6. **`generar_token.js` no carga `.env`** y firma con `secreto_futbol`. Coincide con la API solo porque, por el punto 2, la API tambien usa ese valor.

---

## 7. Resumen del mapa de conexiones

```
App.js
 ├── import src/db.js ─────────────────────────────┐
 ├── import modelo/club.model.js ──── usa db ──────┤
 ├── import modelo/torneo.model.js ── usa db ──────┤
 ├── import modelo/partido.model.js ─ usa db ──────┘  + importa Club y Torneo para las relaciones
 │
 ├── /auth       → routes/auth.route.js    → controlador/auth.controlador.js    (jsonwebtoken)
 ├── /clubes     → routes/club.route.js    → utils/validaciones.js (POST/PUT)
 │                                         → controlador/club.controlador.js    → Club, Partido, Torneo
 ├── /torneos    → routes/torneo.route.js  → controlador/torneo.controlador.js  → Torneo, Club, Partido
 ├── /partidos   → routes/partido.route.js → controlador/partido.controlador.js → Partido, Club, Torneo
 ├── /posiciones → controlador/torneo.controlador.js (obtenerPosiciones)
 ├── /escudos    → public/escudos/*.svg (express.static)
 └── manejadorErrores (utils/error.middleware.js) ← recibe todo lo que llega por next(error)

seed.js → usa db + los 3 modelos → borra y recarga futbol.sqlite
utils/auth.middleware.js → hoy no lo importa nadie
```
