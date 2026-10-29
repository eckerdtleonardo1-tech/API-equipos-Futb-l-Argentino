import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secreto_futbol';

// Usuario hardcodeado para demo (en producción usar una base de datos de usuarios)
const ADMIN_USER = {
  username: process.env.ADMIN_USER || 'admin',
  password: process.env.ADMIN_PASS || 'futbol2026'
};

/**
 * POST /auth/login
 * Body: { username, password }
 * Devuelve un JWT válido por 24 horas
 */
export const login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ mensaje: 'Usuario y contraseña son requeridos.' });
  }

  if (username !== ADMIN_USER.username || password !== ADMIN_USER.password) {
    return res.status(401).json({ mensaje: 'Credenciales inválidas.' });
  }

  const token = jwt.sign(
    { username, rol: 'admin' },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.json({
    mensaje: 'Login exitoso',
    token: `Bearer ${token}`,
    expira_en: '24h'
  });
};
