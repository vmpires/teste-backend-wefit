import express from 'express';
import { registrar } from '../controllers/UsuarioController';

const router = express.Router();

router.post('/registro', registrar);

export default router;
