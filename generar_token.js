import jwt from 'jsonwebtoken';

const token = jwt.sign({ rol: 'admin' }, process.env.JWT_SECRET || 'secreto_futbol', { expiresIn: '1h' });

console.log('Tu token de prueba es:');
console.log('Bearer ' + token);
