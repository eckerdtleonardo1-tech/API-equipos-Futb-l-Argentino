import { z } from 'zod';

// ────────────────────────────────────────────────
// Schema de Creación de Club
// ────────────────────────────────────────────────
export const clubSchema = z.object({
  nombre: z.string({ required_error: 'El nombre es obligatorio' }).min(2, 'El nombre debe tener al menos 2 caracteres'),
  anio_fundacion: z.number({ required_error: 'El año de fundacion es obligatorio' }).int().min(1800, 'Año invalido').max(new Date().getFullYear(), 'El año no puede ser futuro'),
  estadio: z.string({ required_error: 'El estadio es obligatorio' }).min(3, 'El nombre del estadio debe tener al menos 3 caracteres'),
  ciudad: z.string().optional().nullable(),
  presidente: z.string().optional().nullable(),
  director_tecnico: z.string().optional().nullable(),
  cantidad_socios: z.number({ required_error: 'La cantidad de socios es obligatoria' }).int().nonnegative('La cantidad de socios debe ser positiva o cero'),
  escudo_url: z.string({ required_error: 'La URL del escudo es obligatoria' }).url('Debe ser una URL valida'),
  equipaciones: z.object({
    titular: z.string().optional(),
    suplente: z.string().optional(),
    alternativa: z.string().optional()
  }),
  sponsors: z.array(z.string()).optional(),
  trofeos: z.record(z.any()).optional().default({}),
  zona_clausura: z.enum(['A', 'B']).optional().nullable(),
  competencias_activas: z.array(z.string()).optional(),
  posicion_liga: z.record(z.any()).optional().nullable(),
  estado_copa_libertadores: z.string().optional().nullable(),
  estado_copa_sudamericana: z.string().optional().nullable(),
  estado_copa_argentina: z.string().optional().nullable(),
  proximos_partidos: z.array(z.any()).optional(),
  nota: z.string().optional().nullable()
});

// Schema para actualización parcial (PUT)
export const clubUpdateSchema = clubSchema.partial();

// ────────────────────────────────────────────────
// Middlewares de validación
// ────────────────────────────────────────────────
export const validarClub = (req, res, next) => {
  try {
    clubSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

export const validarActualizacionClub = (req, res, next) => {
  try {
    clubUpdateSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
