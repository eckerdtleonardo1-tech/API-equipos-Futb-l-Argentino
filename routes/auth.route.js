import { Router } from 'express';
import { login } from '../controlador/auth.controlador.js';

const router = Router();

router.post('/login', login);

export default router;
