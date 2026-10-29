export const manejadorErrores = (err, req, res, next) => {
  console.error(err);

  if (err.name === 'ZodError') {
    return res.status(400).json({
      mensaje: 'Error de validación de datos',
      detalles: err.errors
    });
  }

  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      mensaje: 'Error de validación de la base de datos',
      detalles: err.errors ? err.errors.map(e => e.message) : err.message
    });
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({
      mensaje: 'Conflicto: Ya existe un registro con esos datos únicos',
      detalles: err.errors ? err.errors.map(e => e.message) : err.message
    });
  }

  res.status(500).json({
    mensaje: 'Ocurrió un error interno en el servidor.'
  });
};
