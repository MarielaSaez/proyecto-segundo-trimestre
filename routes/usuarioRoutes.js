import express from "express";
const router=express.Router();
import usuarioController from '../controllers/usuarioController.js';



router.get('/login',usuarioController.formularioLogin);

router.get('/registro',usuarioController.formularioRegistro);
router.post('/registro', usuarioController.registrar);
router.get('/confirmar/:token',usuarioController.confirmar);
router.get('/olvidePass',usuarioController.formularioOlvidePassword);

export default router;