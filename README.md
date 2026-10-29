# API Futbol Argentino — Liga Profesional 2026

API REST para consultar, crear, modificar y eliminar informacion de los **30 equipos de la Liga Profesional de Futbol Argentino**. 

Incluye datos reales y actualizados al **16 de octubre de 2026**:
- Informacion institucional (año de fundacion, presidente, director tecnico, socios, estadio)
- Equipaciones (titular, suplente, alternativa)
- Trofeos ganados (locales, copas e internacionales)
- Competencias activas (Torneo Clausura, Copa Argentina, Libertadores, Sudamericana)
- Posicion oficial en la tabla (Zona A y Zona B tras disputarse el inicio de la Fecha 13)
- Proximos partidos programados con fecha, hora, estadio y rival

---

## Como empezar en 3 pasos

### Paso 1: Instalar dependencias
Abre una terminal en la carpeta del proyecto y ejecuta:
```bash
npm install
```

### Paso 2: Cargar la base de datos
Ejecuta el script que carga los 30 clubes, torneos y partidos oficiales:
```bash
node seed.js
```

### Paso 3: Iniciar el servidor
```bash
npm start
```

El servidor quedara funcionando en:
```
http://localhost:3000
```

---

## Consultas rapidas desde el navegador

Puedes abrir cualquiera de estos enlaces en tu navegador para ver la informacion en formato JSON:

- Ver todos los 30 clubes: [http://localhost:3000/clubes](http://localhost:3000/clubes)
- Ver solo los clubes de la Zona A: [http://localhost:3000/clubes?zona=A](http://localhost:3000/clubes?zona=A)
- Ver solo los clubes de la Zona B: [http://localhost:3000/clubes?zona=B](http://localhost:3000/clubes?zona=B)
- Buscar un club por nombre: [http://localhost:3000/clubes?buscar=River](http://localhost:3000/clubes?buscar=River)
- Ver la ficha de Boca Juniors (ID 1): [http://localhost:3000/clubes/1](http://localhost:3000/clubes/1)
- Ver proximos partidos de Boca Juniors: [http://localhost:3000/clubes/1/proximos-partidos](http://localhost:3000/clubes/1/proximos-partidos)
- Ver competencias de Boca Juniors: [http://localhost:3000/clubes/1/competencias](http://localhost:3000/clubes/1/competencias)
- Ver la tabla de posiciones oficial: [http://localhost:3000/posiciones](http://localhost:3000/posiciones)
- Ver los torneos activos: [http://localhost:3000/torneos](http://localhost:3000/torneos)
- Ver el fixture y proximos partidos: [http://localhost:3000/partidos](http://localhost:3000/partidos)
- Ver el escudo oficial de Boca Juniors: [http://localhost:3000/escudos/boca-juniors.svg](http://localhost:3000/escudos/boca-juniors.svg)
- Ver el escudo oficial de River Plate: [http://localhost:3000/escudos/river-plate.svg](http://localhost:3000/escudos/river-plate.svg)

---

## Tabla completa de Endpoints

### 1. Clubes

| Metodo | URL | Que hace |
|---|---|---|
| GET | `/clubes` | Lista los 30 clubes. Puedes filtrar con `?zona=A`, `?zona=B` o buscar con `?buscar=nombre` |
| GET | `/clubes/:id` | Devuelve toda la informacion de un club por su ID (ej: `/clubes/1`) |
| GET | `/clubes/:id/proximos-partidos` | Muestra el calendario de proximos partidos del club en cada torneo |
| GET | `/clubes/:id/competencias` | Muestra en que torneos juega el club y en que posicion o fase esta |
| POST | `/clubes` | Agrega un nuevo equipo a la base de datos |
| PUT | `/clubes/:id` | Modifica datos de un equipo existente |
| DELETE | `/clubes/:id` | Elimina un equipo por su ID |

### 2. Tablas de Posiciones

| Metodo | URL | Que hace |
|---|---|---|
| GET | `/posiciones` | Tablas de posiciones oficiales del Torneo Clausura 2026 (Zona A y Zona B) |
| GET | `/posiciones?zona=A` | Muestra unicamente la tabla de la Zona A |
| GET | `/posiciones?zona=B` | Muestra unicamente la tabla de la Zona B |

### 3. Torneos

| Metodo | URL | Que hace |
|---|---|---|
| GET | `/torneos` | Lista los torneos oficiales (Clausura 2026, Copa Argentina, Libertadores, Sudamericana) |
| GET | `/torneos/:id` | Informacion y estado de un torneo por su ID |
| GET | `/torneos/:id/posiciones` | Tabla de posiciones del torneo |
| GET | `/torneos/:id/partidos` | Partidos correspondientes a ese torneo |

### 4. Partidos y Calendario

| Metodo | URL | Que hace |
|---|---|---|
| GET | `/partidos` | Lista los partidos oficiales programados (Fecha 13 y semifinales de copas) |
| GET | `/partidos/:id` | Informacion detallada de un partido por su ID |

### 5. Escudos e Imagenes Oficiales

| Metodo | URL | Que hace |
|---|---|---|
| GET | `/escudos/:archivo` | Sirve la imagen vectorial SVG oficial del club directamente desde el servidor local (ej: `/escudos/boca-juniors.svg`, `/escudos/river-plate.svg`). Los 30 clubes cuentan con formato vectorial SVG nativo, sin pixelado, sin error de archivo no encontrado y sin bloqueos externos. |

---

## Que devuelve cada GET (formato y tipos de datos)

Todos los endpoints (excepto `/escudos`) responden en formato **JSON** (`Content-Type: application/json; charset=utf-8`). Las fechas con hora (`fecha_hora`) se devuelven como `string` en formato **ISO 8601** (ej: `"2026-10-16T21:30:00.000Z"`).

### Objeto `Club`

Es el objeto que devuelven `GET /clubes`, `GET /clubes/:id`, `POST`, `PUT`:

| Campo | Tipo | Descripcion |
|---|---|---|
| `id` | `number` (entero) | Identificador unico del club |
| `nombre` | `string` | Nombre del club (unico) |
| `anio_fundacion` | `number` (entero) | Año de fundacion |
| `estadio` | `string` | Nombre del estadio |
| `ciudad` | `string` \| `null` | Ciudad |
| `presidente` | `string` \| `null` | Presidente actual |
| `director_tecnico` | `string` \| `null` | Director tecnico actual |
| `cantidad_socios` | `number` (entero) | Cantidad de socios |
| `escudo_url` | `string` | URL completa del escudo (ej: `http://localhost:3000/escudos/boca-juniors.svg`) |
| `equipaciones` | `object` | `{ titular: string, suplente: string, alternativa: string }` |
| `sponsors` | `array` de `string` | Lista de sponsors |
| `trofeos` | `object` | Cantidad de trofeos por competencia (ej: `{ "liga_argentina": 35, ... }`), valores `number` |
| `zona_clausura` | `string` (`"A"` o `"B"`) \| `null` | Zona en el Torneo Clausura |
| `competencias_activas` | `array` de `string` | Competencias que disputa actualmente |
| `posicion_liga` | `object` \| `null` | `{ zona, posicion, puntos, partidos_jugados, ganados, empatados, perdidos, goles_favor, goles_contra, diferencia_goles }` (`zona` es `string`, el resto `number`) |
| `estado_copa_libertadores` | `string` \| `null` | Fase en la que esta en la Libertadores |
| `estado_copa_sudamericana` | `string` \| `null` | Fase en la que esta en la Sudamericana |
| `estado_copa_argentina` | `string` \| `null` | Fase en la que esta en la Copa Argentina |
| `proximos_partidos` | `array` de `object` | Cada item: `{ competencia, fecha, hora, condicion, rival, estadio }` (todos `string`) |
| `nota` | `string` \| `null` | Observaciones |

### Objeto `Torneo`

| Campo | Tipo | Descripcion |
|---|---|---|
| `id` | `number` (entero) | Identificador del torneo |
| `nombre` | `string` | Nombre del torneo |
| `anio` | `number` (entero) | Temporada |
| `descripcion` | `string` \| `null` | Descripcion del torneo |
| `estado` | `string` \| `null` | Estado actual (ej: `"Semifinales"`) |
| `campeon_ultima_edicion` | `string` \| `null` | Ultimo campeon |
| `es_activo` | `boolean` | Si el torneo esta en disputa |

### Objeto `Partido`

| Campo | Tipo | Descripcion |
|---|---|---|
| `id` | `number` (entero) | Identificador del partido |
| `fecha_hora` | `string` (ISO 8601) | Fecha y hora del partido |
| `estadio` | `string` | Estadio donde se juega |
| `goles_local` | `number` \| `null` | Goles del local (`null` si no se jugo) |
| `goles_visitante` | `number` \| `null` | Goles del visitante (`null` si no se jugo) |
| `estado` | `string` | Estado del partido (ej: `"PROGRAMADO"`) |
| `torneo_id` | `number` | ID del torneo |
| `local_id` | `number` | ID del club local |
| `visitante_id` | `number` | ID del club visitante |
| `Local` | `object` | Club local resumido: `{ id, nombre, escudo_url, ciudad, estadio }` |
| `Visitante` | `object` | Club visitante resumido: `{ id, nombre, escudo_url, ciudad, estadio }` |
| `Torneo` | `object` | `{ id, nombre, anio }` |

### Respuesta de cada GET (con ejemplos)

Los ejemplos son respuestas reales de la API con los datos cargados por `seed.js`. En las listas largas se muestra solo un elemento de muestra (no siempre el primero) y se indica con `...` lo que se recorto. Para que los ejemplos se lean mejor, algunos textos largos tambien estan cortados.

#### `GET /clubes`

Devuelve un `object` con la lista de clubes ordenada alfabeticamente por nombre. Acepta `?zona=A`, `?zona=B` y `?buscar=texto`.

Estructura: `{ total: number, fecha_actualizacion: string, clubes: Club[] }`

Ejemplo — `GET /clubes?zona=A`:

```json
{
  "total": 15,
  "fecha_actualizacion": "16/10/2026",
  "clubes": [
    {
      "id": 1,
      "nombre": "Boca Juniors",
      "anio_fundacion": 1905,
      "estadio": "La Bombonera",
      "ciudad": "Buenos Aires",
      "presidente": "Juan Román Riquelme",
      "director_tecnico": "Rodolfo Arruabarrena",
      "cantidad_socios": 314000,
      "escudo_url": "http://localhost:3000/escudos/boca-juniors.svg",
      "zona_clausura": "A",
      ...
    },
    ...
  ]
}
```

Cada elemento de `clubes` es un objeto `Club` completo (igual al de `GET /clubes/:id`).

#### `GET /clubes/:id`

Devuelve un `object` `Club` con todos sus campos.

Ejemplo — `GET /clubes/1`:

```json
{
  "id": 1,
  "nombre": "Boca Juniors",
  "anio_fundacion": 1905,
  "estadio": "La Bombonera",
  "ciudad": "Buenos Aires",
  "presidente": "Juan Román Riquelme",
  "director_tecnico": "Rodolfo Arruabarrena",
  "cantidad_socios": 314000,
  "escudo_url": "http://localhost:3000/escudos/boca-juniors.svg",
  "equipaciones": {
    "titular": "Camiseta azul con franja amarilla horizontal, pantalón azul",
    "suplente": "Camiseta amarilla, pantalón azul",
    "alternativa": "Camiseta negra, pantalón negro"
  },
  "sponsors": ["Betsson", "DirecTV", "Adidas"],
  "trofeos": {
    "liga_argentina": 34,
    "copa_argentina": 6,
    "supercopa_argentina": 2,
    "copa_libertadores": 6,
    "copa_sudamericana": 2,
    "recopa_sudamericana": 4,
    "copa_interamericana": 2,
    "intercontinental": 2,
    "total_internacionales": 16
  },
  "zona_clausura": "A",
  "competencias_activas": [
    "Liga Profesional — Clausura 2026 (Zona A)",
    "Copa Sudamericana 2026 (Semifinales)"
  ],
  "posicion_liga": {
    "zona": "A",
    "posicion": 3,
    "puntos": 21,
    "partidos_jugados": 12,
    "ganados": 5,
    "empatados": 6,
    "perdidos": 1,
    "goles_favor": 19,
    "goles_contra": 13,
    "diferencia_goles": 6
  },
  "estado_copa_libertadores": null,
  "estado_copa_sudamericana": "Semifinales — ida perdida 0-1 vs Vasco da Gama. Vuelta pendiente.",
  "estado_copa_argentina": "Semifinales — vs Banfield (sábado 14 de noviembre, sede a confirmar)",
  "proximos_partidos": [
    {
      "competencia": "Liga Profesional — Clausura 2026 (Jornada 13)",
      "fecha": "2026-10-16",
      "hora": "21:30",
      "condicion": "Local",
      "rival": "Talleres (Córdoba)",
      "estadio": "La Bombonera, Buenos Aires"
    },
    ...
  ],
  "nota": null
}
```

#### `GET /clubes/:id/proximos-partidos`

Devuelve un `object` con el calendario del club. Trae dos listas:
- `proximos_partidos_detallados`: los partidos guardados en la ficha del club (`fecha` y `hora` son `string` y pueden decir "Por confirmar").
- `partidos_programados_calendario`: los partidos con estado `PROGRAMADO` de la tabla de partidos. Cada item: `{ id_partido: number, competencia: string, fecha_hora: string, estadio: string, condicion: "Local" | "Visitante", rival: { id, nombre, escudo_url, estadio } }`.

Ejemplo — `GET /clubes/1/proximos-partidos`:

```json
{
  "club": "Boca Juniors",
  "escudo_url": "/escudos/boca-juniors.svg",
  "director_tecnico": "Rodolfo Arruabarrena",
  "competencias_activas": [
    "Liga Profesional — Clausura 2026 (Zona A)",
    "Copa Sudamericana 2026 (Semifinales)"
  ],
  "proximos_partidos_detallados": [
    {
      "competencia": "Copa Sudamericana 2026 — Semifinal Vuelta",
      "fecha": "Por confirmar (antes del 25/10)",
      "hora": "Por confirmar",
      "condicion": "Visitante",
      "rival": "Vasco da Gama",
      "estadio": "Estadio São Januário, Río de Janeiro (Brasil)"
    },
    ...
  ],
  "partidos_programados_calendario": [
    {
      "id_partido": 3,
      "competencia": "Liga Profesional — Torneo Clausura 2026",
      "fecha_hora": "2026-10-17T00:30:00.000Z",
      "estadio": "La Bombonera (Buenos Aires)",
      "condicion": "Local",
      "rival": {
        "id": 4,
        "nombre": "Talleres",
        "escudo_url": "/escudos/talleres.svg",
        "estadio": "Estadio Mario Alberto Kempes"
      }
    },
    ...
  ]
}
```

> En este endpoint `escudo_url` viene como ruta relativa (`/escudos/...`), no como URL completa.

#### `GET /clubes/:id/competencias`

Devuelve un `object` con las competencias que juega el club y como le va en cada una. `posicion_liga_profesional` tiene la misma forma que `posicion_liga` del club, y `proximos_partidos_por_competencia` la misma que `proximos_partidos`.

Ejemplo — `GET /clubes/1/competencias`:

```json
{
  "club": "Boca Juniors",
  "escudo_url": "/escudos/boca-juniors.svg",
  "director_tecnico": "Rodolfo Arruabarrena",
  "competencias_activas": [
    "Liga Profesional — Clausura 2026 (Zona A)",
    "Copa Sudamericana 2026 (Semifinales)"
  ],
  "posicion_liga_profesional": {
    "zona": "A",
    "posicion": 3,
    "puntos": 21,
    "partidos_jugados": 12,
    "ganados": 5,
    "empatados": 6,
    "perdidos": 1,
    "goles_favor": 19,
    "goles_contra": 13,
    "diferencia_goles": 6
  },
  "estado_copa_argentina": "Semifinales — vs Banfield (sábado 14 de noviembre, sede a confirmar)",
  "estado_copa_libertadores": null,
  "estado_copa_sudamericana": "Semifinales — ida perdida 0-1 vs Vasco da Gama. Vuelta pendiente.",
  "proximos_partidos_por_competencia": [
    {
      "competencia": "Copa Argentina 2026 — Semifinal",
      "fecha": "2026-11-14",
      "hora": "Por confirmar",
      "condicion": "Por confirmar",
      "rival": "Banfield",
      "estadio": "Por confirmar"
    },
    ...
  ]
}
```

#### `GET /posiciones` y `GET /torneos/:id/posiciones`

Devuelve un `object` con los datos del torneo y la tabla de cada zona ordenada por posicion. Sin filtro trae `zona_a` y `zona_b`; con `?zona=A` trae solo `zona_A` y con `?zona=B` solo `zona_B` (con la letra en mayuscula).

Estructura: `{ torneo: string, temporada: number, estado: string, formato: string, fecha_actualizacion: string, zona_a: Fila[], zona_b: Fila[] }`

En cada fila todos los campos son `number`, excepto `club` (`object`) y `clasificacion` (`string`: `"Octavos de Final (Playoffs)"` para los 8 primeros o `"Fase Regular"`).

Ejemplo — `GET /posiciones`:

```json
{
  "torneo": "Liga Profesional — Torneo Clausura 2026",
  "temporada": 2026,
  "estado": "En curso (Fecha 13 en disputa)",
  "formato": "2 zonas de 15 equipos. Los 8 primeros de cada zona clasifican a octavos de final.",
  "fecha_actualizacion": "16/10/2026 (Fecha 13 en disputa)",
  "zona_a": [
    {
      "posicion": 1,
      "club": {
        "id": 13,
        "nombre": "Instituto",
        "escudo_url": "http://localhost:3000/escudos/instituto.svg",
        "estadio": "Estadio Monumental de Alta Córdoba",
        "ciudad": "Córdoba"
      },
      "puntos": 26,
      "partidos_jugados": 12,
      "ganados": 8,
      "empatados": 2,
      "perdidos": 2,
      "goles_favor": 19,
      "goles_contra": 10,
      "diferencia_goles": 9,
      "clasificacion": "Octavos de Final (Playoffs)"
    },
    ...
  ],
  "zona_b": [
    {
      "posicion": 1,
      "club": {
        "id": 24,
        "nombre": "Rosario Central",
        "escudo_url": "http://localhost:3000/escudos/rosario-central.svg",
        "estadio": "Estadio Gigante de Arroyito",
        "ciudad": "Rosario"
      },
      "puntos": 22,
      "partidos_jugados": 12,
      "ganados": 6,
      "empatados": 4,
      "perdidos": 2,
      "goles_favor": 17,
      "goles_contra": 9,
      "diferencia_goles": 8,
      "clasificacion": "Octavos de Final (Playoffs)"
    },
    ...
  ]
}
```

#### `GET /torneos`

Devuelve un `object` con la lista de torneos, del mas reciente al mas antiguo.

Estructura: `{ total: number, fecha_actualizacion: string, torneos: Torneo[] }`

Ejemplo — `GET /torneos`:

```json
{
  "total": 4,
  "fecha_actualizacion": "16/10/2026",
  "torneos": [
    {
      "id": 2,
      "nombre": "Copa Argentina 2026",
      "anio": 2026,
      "descripcion": "Copa de eliminación directa abierta a todos los clubes del fútbol argentino. En semifinales quedan: Atlético Tucumán vs Platense (28/10) y Banfield vs Boca Juniors (14/11).",
      "estado": "Semifinales",
      "campeon_ultima_edicion": "Independiente Rivadavia (Copa Argentina 2025 — venció a Argentinos Juniors 5-3 por penales tras 2-2; ...)",
      "es_activo": true
    },
    ...
  ]
}
```

#### `GET /torneos/:id`

Devuelve un `object` `Torneo`.

Ejemplo — `GET /torneos/1`:

```json
{
  "id": 1,
  "nombre": "Liga Profesional — Torneo Clausura 2026",
  "anio": 2026,
  "descripcion": "Segundo torneo de la temporada 2026. Fase regular: 16 jornadas en dos zonas de 15 equipos. Los 8 primeros de cada zona clasifican a playoffs (octavos de final) por el título.",
  "estado": "En curso (Fecha 13 en disputa)",
  "campeon_ultima_edicion": "Belgrano (Torneo Apertura 2026 — venció a River Plate 3-2 en la final; ...)",
  "es_activo": true
}
```

#### `GET /torneos/:id/partidos`

Devuelve un `object` con los partidos del torneo ordenados por fecha. Cada partido es un objeto `Partido` sin el campo `Torneo`.

Estructura: `{ torneo: string, total_partidos: number, partidos: Partido[] }`

Ejemplo — `GET /torneos/2/partidos`:

```json
{
  "torneo": "Copa Argentina 2026",
  "total_partidos": 2,
  "partidos": [
    {
      "id": 16,
      "fecha_hora": "2026-10-29T00:15:00.000Z",
      "estadio": "Estadio Padre Martearena (Salta)",
      "goles_local": null,
      "goles_visitante": null,
      "estado": "PROGRAMADO",
      "torneo_id": 2,
      "local_id": 21,
      "visitante_id": 12,
      "Local": {
        "id": 21,
        "nombre": "Atlético Tucumán",
        "escudo_url": "/escudos/atletico-tucuman.svg",
        "ciudad": "Tucumán",
        "estadio": "Estadio Monumental José Fierro"
      },
      "Visitante": {
        "id": 12,
        "nombre": "Platense",
        "escudo_url": "/escudos/platense.svg",
        "ciudad": "Vicente López",
        "estadio": "Estadio Ciudad de Vicente López"
      }
    },
    ...
  ]
}
```

#### `GET /partidos`

Devuelve un `object` con todos los partidos ordenados por fecha. Acepta `?torneo_id=1` para filtrar por torneo.

Estructura: `{ total: number, fecha_actualizacion: string, jornada: string, partidos: Partido[] }`

Ejemplo — `GET /partidos`:

```json
{
  "total": 17,
  "fecha_actualizacion": "16/10/2026",
  "jornada": "Fecha 13 del Torneo Clausura 2026 y Semifinales de Copas",
  "partidos": [
    {
      "id": 1,
      "fecha_hora": "2026-10-15T23:00:00.000Z",
      "estadio": "Estadio Tomás Adolfo Ducó (Buenos Aires)",
      "goles_local": 1,
      "goles_visitante": 2,
      "estado": "FINALIZADO",
      "torneo_id": 1,
      "local_id": 18,
      "visitante_id": 22,
      "Local": {
        "id": 18,
        "nombre": "Huracán",
        "escudo_url": "/escudos/huracan.svg",
        "ciudad": "Buenos Aires",
        "estadio": "Estadio Tomás Adolfo Ducó (El Palacio)"
      },
      "Visitante": {
        "id": 22,
        "nombre": "Gimnasia y Esgrima La Plata",
        "escudo_url": "/escudos/gimnasia-lp.svg",
        "ciudad": "La Plata",
        "estadio": "Estadio Juan Carlos Zerillo (El Bosque)"
      },
      "Torneo": {
        "id": 1,
        "nombre": "Liga Profesional — Torneo Clausura 2026",
        "anio": 2026
      }
    },
    ...
  ]
}
```

#### `GET /partidos/:id`

Devuelve un `object` `Partido`. A diferencia del listado, cada club incluye tambien `presidente`.

Ejemplo — `GET /partidos/1`:

```json
{
  "id": 1,
  "fecha_hora": "2026-10-15T23:00:00.000Z",
  "estadio": "Estadio Tomás Adolfo Ducó (Buenos Aires)",
  "goles_local": 1,
  "goles_visitante": 2,
  "estado": "FINALIZADO",
  "torneo_id": 1,
  "local_id": 18,
  "visitante_id": 22,
  "Local": {
    "id": 18,
    "nombre": "Huracán",
    "escudo_url": "/escudos/huracan.svg",
    "estadio": "Estadio Tomás Adolfo Ducó (El Palacio)",
    "ciudad": "Buenos Aires",
    "presidente": "Abel Poza"
  },
  "Visitante": {
    "id": 22,
    "nombre": "Gimnasia y Esgrima La Plata",
    "escudo_url": "/escudos/gimnasia-lp.svg",
    "estadio": "Estadio Juan Carlos Zerillo (El Bosque)",
    "ciudad": "La Plata",
    "presidente": "Mariano Cowen"
  },
  "Torneo": {
    "id": 1,
    "nombre": "Liga Profesional — Torneo Clausura 2026",
    "anio": 2026
  }
}
```

> En `/partidos` y `/torneos/:id/partidos` el `escudo_url` de los clubes viene como ruta relativa (`/escudos/...`).

#### `GET /escudos/:archivo`

No devuelve JSON: devuelve directamente la imagen del escudo en formato SVG (`Content-Type: image/svg+xml`). Si el archivo no existe responde 404.

Ejemplo — `GET /escudos/boca-juniors.svg`:

```
HTTP/1.1 200 OK
Content-Type: image/svg+xml

<svg ...> (contenido de la imagen) </svg>
```

### Errores en los GET

Si el ID no existe, la respuesta es **404 Not Found** con un `object`:

```json
{ "mensaje": "Club no encontrado" }
```

(o `"Torneo no encontrado"` / `"Partido no encontrado"` segun el caso). Si ocurre un error inesperado se responde **500** con `{ "mensaje": "Ocurrió un error interno en el servidor." }`.

---

## Torneos Oficiales y Ultimos Campeones (Al 16/10/2026)

La API cuenta con el registro oficial de competencias y el historial de sus ultimos campeones:

### 1. Liga Profesional de Futbol Argentino (Torneo Clausura 2026)
- **Estado:** En disputa (Fecha 13 en curso).
- **Ultimo Campeon (Apertura 2026):** Belgrano de Cordoba (vencio 3-2 a River Plate en la final).
- **Campeones Temporada 2025:** Rosario Central (Campeon Anual 2025), Platense (Torneo Apertura 2025), Estudiantes de La Plata (Torneo Clausura 2025 y Trofeo de Campeones 2025).
- **Campeones Temporada 2024:** Velez Sarsfield (Liga Profesional Betano 2024), Estudiantes de La Plata (Copa de la Liga 2024 y Trofeo de Campeones 2024).

### 2. Copa Argentina 2026
- **Estado:** Semifinales (Atletico Tucuman vs Platense el 28/10; Banfield vs Boca Juniors el 14/11).
- **Ultimo Campeon (2025):** Independiente Rivadavia (vencio en la final a Argentinos Juniors 5-3 por penales tras empatar 2-2).
- **Campeon Edicion 2024:** Central Cordoba de Santiago del Estero (vencio 1-0 a Velez Sarsfield).

### 3. Copa CONMEBOL Libertadores 2026
- **Estado:** Semifinales (con Estudiantes de La Plata como representante argentino enfrentando a Flamengo).
- **Ultimo Campeon (2025):** Flamengo (Brasil) — derroto 1-0 a Palmeiras en la final.
- **Campeon Edicion 2024:** Botafogo (Brasil) — derroto 3-1 a Atletico Mineiro en la final.

### 4. Copa CONMEBOL Sudamericana 2026
- **Estado:** Semifinales (con Boca Juniors como representante argentino enfrentando a Vasco da Gama).
- **Ultimo Campeon (2025):** Lanus (Argentina) — derroto 5-4 por penales a Atletico Mineiro tras igualar 0-0 en la final.
- **Campeon Edicion 2024:** Racing Club (Argentina) — derroto 3-1 a Cruzeiro en la final.

---

## Guia de uso del CRUD (Crear, Modificar y Eliminar Equipos)

Puedes usar herramientas como **Postman**, **Insomnia**, la extension **Thunder Client** de VS Code o comandos desde la terminal.

### 1. Como crear un nuevo equipo (POST)

Envia una peticion `POST` a `http://localhost:3000/clubes` con el encabezado `Content-Type: application/json` y este cuerpo:

```json
{
  "nombre": "Club Atletico Ejemplo",
  "anio_fundacion": 1945,
  "estadio": "Estadio San Martin",
  "ciudad": "Rosario",
  "presidente": "Carlos Gomez",
  "director_tecnico": "Marcelo Bielsa",
  "cantidad_socios": 15000,
  "escudo_url": "https://ejemplo.com/escudo.png",
  "equipaciones": {
    "titular": "Camiseta azul y blanca a rayas, pantalon azul",
    "suplente": "Camiseta blanca, pantalon blanco",
    "alternativa": "Camiseta negra, pantalon negro"
  },
  "sponsors": ["Sponsor Uno", "Sponsor Dos"],
  "trofeos": {
    "liga_argentina": 1,
    "copa_argentina": 0,
    "total_internacionales": 0
  },
  "zona_clausura": "A",
  "competencias_activas": [
    "Liga Profesional — Clausura 2026 (Zona A)"
  ]
}
```

**Respuesta esperada (201 Created):**
```json
{
  "mensaje": "Club creado exitosamente",
  "club": {
    "id": 31,
    "nombre": "Club Atletico Ejemplo",
    "director_tecnico": "Marcelo Bielsa",
    "cantidad_socios": 15000,
    ...
  }
}
```

---

### 2. Como modificar un equipo (PUT)

Envia una peticion `PUT` a `http://localhost:3000/clubes/:id` indicando solo los campos que quieras cambiar. No necesitas enviar todo el objeto:

Por ejemplo, para cambiar el Director Tecnico y la cantidad de socios de Boca Juniors (ID 1):

```json
{
  "director_tecnico": "Nuevo Entrenador",
  "cantidad_socios": 320000
}
```

**Respuesta esperada (200 OK):**
```json
{
  "mensaje": "Club actualizado exitosamente",
  "club": {
    "id": 1,
    "nombre": "Boca Juniors",
    "director_tecnico": "Nuevo Entrenador",
    "cantidad_socios": 320000,
    ...
  }
}
```

**Que devuelve el PUT:**

| Campo | Tipo | Descripcion |
|---|---|---|
| `mensaje` | `string` | Siempre `"Club actualizado exitosamente"` |
| `club` | `object` (`Club`) | El club completo con los cambios ya aplicados (todos los campos, no solo los modificados). Ver la tabla del objeto `Club` mas arriba |

Los campos que envies deben respetar los mismos tipos que al crear (por ejemplo `cantidad_socios` tiene que ser `number` entero, `zona_clausura` solo `"A"` o `"B"`, `escudo_url` una URL valida).

**Posibles errores del PUT:**

| Codigo | Cuando ocurre | Respuesta |
|---|---|---|
| 404 Not Found | No existe un club con ese ID | `{ "mensaje": "Club no encontrado" }` |
| 400 Bad Request | Se quiere cambiar el `nombre` por uno que ya usa otro club | `{ "mensaje": "Ya existe otro club con ese nombre." }` |
| 400 Bad Request | Algun campo tiene un tipo o valor invalido | `{ "mensaje": "Error de validación de datos" }` (hoy no incluye `detalles`, ver [FLUJO_API.md](FLUJO_API.md) seccion 6) |

---

### 3. Como eliminar un equipo (DELETE)

Envia una peticion `DELETE` a `http://localhost:3000/clubes/:id` indicando el ID del equipo a borrar.

Por ejemplo, para eliminar el equipo con ID 31:
```
DELETE http://localhost:3000/clubes/31
```

**Respuesta esperada (200 OK):**
```json
{
  "mensaje": "Club Club Atletico Ejemplo eliminado exitosamente"
}
```

**Que devuelve el DELETE:**

No necesita cuerpo en la peticion. Responde un `object` JSON con un unico campo:

| Campo | Tipo | Descripcion |
|---|---|---|
| `mensaje` | `string` | `"Club <nombre del club> eliminado exitosamente"` |

No devuelve los datos del club borrado; si los necesitas, consultalos antes con `GET /clubes/:id`.

**Posibles errores del DELETE:**

| Codigo | Cuando ocurre | Respuesta |
|---|---|---|
| 404 Not Found | No existe un club con ese ID (o ya fue eliminado) | `{ "mensaje": "Club no encontrado" }` |
| 500 Internal Server Error | Error inesperado del servidor | `{ "mensaje": "Ocurrió un error interno en el servidor." }` |

---

## Lista de los 30 Clubes (Datos Oficiales al 16/10/2026)

### Zona A

| ID | Club | Ciudad | Presidente | Director Tecnico | Estadio | Socios |
|:---:|---|---|---|---|---|:---:|
| 13 | Instituto | Cordoba | Juan Manuel Cavagliatto | Diego Flores | Monumental de Alta Cordoba | 30.000 |
| 8 | Defensa y Justicia | Florencio Varela | Diego Lemme | Julio Vaccari | Norberto Tito Tomaghello | 20.000 |
| 1 | Boca Juniors | Buenos Aires | Juan Roman Riquelme | Rodolfo Arruabarrena | La Bombonera | 314.000 |
| 7 | Velez Sarsfield | Buenos Aires | Fabian Berlanga | Guillermo Barros Schelotto | Jose Amalfitani | 78.000 |
| 6 | Lanus | Lanus | Nicolas Russo | Mauricio Pellegrino | Ciudad de Lanus (La Fortaleza) | 43.000 |
| 15 | Gimnasia y Esgrima (Mendoza) | Mendoza | Fernando Porretta | Dario Franco | Victor Antonio Legrotaglie | 12.000 |
| 3 | Independiente | Avellaneda | Nestor Grindetti | Jadson Viera | Libertadores de America | 110.000 |
| 9 | Newell's Old Boys | Rosario | Ignacio Boero | Frank Dario Kudelka | Marcelo Bielsa (El Coloso) | 65.000 |
| 5 | Estudiantes de La Plata | La Plata | Juan Sebastian Veron | Alexander Medina | UNO Jorge Luis Hirschi | 55.000 |
| 2 | San Lorenzo | Buenos Aires | Marcelo Culotta | Nestor Gorosito | El Nuevo Gasometro | 90.000 |
| 10 | Union | Santa Fe | Luis Spahn | Leonardo Madelon | 15 de Abril | 32.000 |
| 14 | Deportivo Riestra | Buenos Aires | Fernando Salorio | Guillermo Duro | Guillermo Laza | 8.000 |
| 12 | Platense | Vicente Lopez | Gaston Arcieri | Martin Palermo | Ciudad de Vicente Lopez | 18.000 |
| 11 | Central Cordoba (SdE) | Santiago del Estero | Hernan Zanni | Sebastian Dominguez | Madre de Ciudades | 16.000 |
| 4 | Talleres | Cordoba | Andres Fassi | Omar De Felippe | Mario Alberto Kempes | 58.000 |

### Zona B

| ID | Club | Ciudad | Presidente | Director Tecnico | Estadio | Socios |
|:---:|---|---|---|---|---|:---:|
| 24 | Rosario Central | Rosario | Gonzalo Belloso | Jorge Almiron | Gigante de Arroyito | 73.000 |
| 23 | Belgrano | Cordoba | Luis Fabian Artime | Ricardo Zielinski | Julio Cesar Villagra | 66.000 |
| 19 | Argentinos Juniors | Buenos Aires | Cristian Malaspina | Nicolas Diez | Diego Armando Maradona | 38.000 |
| 22 | Gimnasia y Esgrima La Plata | La Plata | Mariano Cowen | Ariel Pereyra | Juan Carlos Zerillo (El Bosque) | 48.000 |
| 27 | Sarmiento (Junin) | Junin | Fernando Chiofalo | Facundo Sava | Eva Peron | 14.000 |
| 18 | Huracan | Buenos Aires | Abel Poza | Diego Martinez | Tomas Adolfo Duco (El Palacio) | 52.000 |
| 16 | River Plate | Buenos Aires | Stefano Di Carlo | Leonardo Ponzio | Monumental | 335.000 |
| 20 | Independiente Rivadavia | Mendoza | Daniel Vila | Alfredo Berti | Bautista Gargantini | 22.000 |
| 28 | Barracas Central | Buenos Aires | Matias Tapia | Damian Ayude | Claudio Chiqui Tapia | 12.000 |
| 17 | Racing Club | Avellaneda | Diego Milito | Sebastian Romero | Presidente Peron (El Cilindro) | 83.000 |
| 21 | Atletico Tucuman | Tucuman | Mario Leito | Julio Cesar Falcioni | Monumental Jose Fierro | 35.000 |
| 25 | Banfield | Banfield | Matias Mariotto | Pedro Troglio | Florencio Sola | 35.000 |
| 26 | Tigre | Victoria | Martin Suarez | Diego Dabove | Jose Dellagiovanna (El Matador) | 28.000 |
| 29 | Aldosivi | Mar del Plata | Hernan Tillous | Javier Sanguinetti | Jose Maria Minella | 18.000 |
| 30 | Estudiantes de Rio Cuarto | Rio Cuarto | Luis Amor | Ruben Dario Forestello | Ciudad de Rio Cuarto | 9.000 |

---

## Estructura de Carpetas del Proyecto

```
API equipos Futbol Argentino/
├── App.js               Punto de entrada principal. Configura Express y las rutas.
├── FLUJO_API.md         Explicacion del flujo interno de la API y de como se conectan los archivos.
├── seed.js              Script para cargar los 30 clubes, torneos y fixture inicial.
├── package.json         Lista de dependencias y scripts de ejecucion (start, dev).
├── futbol.sqlite        Archivo de base de datos SQLite (se genera automaticamente).
│
├── src/
│   └── db.js            Configuracion de la conexion a la base de datos con Sequelize.
│
├── public/
│   └── escudos/         Escudos oficiales de los 30 clubes en formato vectorial SVG servidos localmente.
│
├── modelo/
│   ├── club.model.js    Estructura de la tabla de clubes en la base de datos.
│   ├── torneo.model.js  Estructura de la tabla de torneos.
│   └── partido.model.js Estructura de la tabla de partidos y sus relaciones.
│
├── controlador/
│   ├── club.controlador.js    Logica de las consultas y CRUD de clubes.
│   ├── torneo.controlador.js  Logica de torneos y calculo de tablas de posiciones.
│   └── partido.controlador.js Logica para consultar los partidos programados.
│
├── routes/
│   ├── club.route.js    Rutas web para los clubes (/clubes).
│   ├── torneo.route.js  Rutas web para los torneos (/torneos).
│   └── partido.route.js Rutas web para los partidos (/partidos).
│
└── utils/
    ├── error.middleware.js Manejo de errores para que la API responda con claridad.
    └── validaciones.js     Validacion de los datos enviados al crear o editar clubes.
```

---

## Tecnologias utilizadas

- **Node.js**: Entorno de ejecucion de JavaScript en el servidor.
- **Express**: Framework web para crear los endpoints y manejar peticiones HTTP.
- **Sequelize**: ORM para gestionar la base de datos sin necesidad de escribir SQL manual.
- **SQLite3**: Base de datos ligera en un archivo local (`futbol.sqlite`), sin requerir instalar servidores externos como MySQL o PostgreSQL.
- **Zod**: Libreria para validar que los datos enviados en peticiones POST y PUT sean correctos.

---

## Licencia

ISC