import { Router } from "express";
import { login, register } from "./auth.controller.js";
import { registerValidator, loginValidator } from "../middleware/auth-validator.js";

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints para autenticación
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre de usuario
 *               password:
 *                 type: string
 *                 description: Contraseña
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 userDetails:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                     token:
 *                       type: string
 *       400:
 *         description: Credenciales incorrectas
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del usuario
 *               surname:
 *                 type: string
 *                 description: Apellido del usuario
 *               username:
 *                 type: string
 *                 description: Nombre de usuario
 *               password:
 *                 type: string
 *                 description: Contraseña
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 userDetails:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: string
 *       400:
 *         description: Datos de registro inválidos
 *       500:
 *         description: Error del servidor
 */

const router = Router();

router.post(
    '/login',loginValidator,login);

router.post(
    '/register',registerValidator,register);

export default router;