import { Router } from "express";
import {generateExcel, updateCompany, listCompanies, registerCompany } from "../companys/company.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Companies
 *   description: Endpoints para gestión de empresas
 */

/**
 * @swagger
 * /gestorEmpresas/v1/company/registerCompany:
 *   post:
 *     summary: Registrar una nueva empresa
 *     tags: [Companies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la empresa
 *               companyType:
 *                 type: string
 *                 description: Tipo de empresa
 *               incorporationDate:
 *                 type: string
 *                 format: date
 *                 description: Fecha de incorporación
 *               category:
 *                 type: string
 *                 description: Categoría de la empresa
 *               years:
 *                 type: number
 *                 description: Años en el negocio
 *               representative:
 *                 type: object
 *                 properties:
 *                   nameRepre:
 *                     type: string
 *                     description: Nombre del representante
 *                   position:
 *                     type: string
 *                     description: Posición del representante
 *                   contact:
 *                     type: object
 *                     properties:
 *                       email:
 *                         type: string
 *                         description: Email del representante
 *                       phone:
 *                         type: string
 *                         description: Teléfono del representante
 *     responses:
 *       201:
 *         description: Empresa registrada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 companyDetails:
 *                   type: object
 *                   properties:
 *                     empresa:
 *                       type: string
 *                     representante:
 *                       type: string
 *                     posicion:
 *                       type: string
 *       500:
 *         description: Error del servidor
 */
router.post('/registerCompany', registerCompany);

/**
 * @swagger
 * /gestorEmpresas/v1/company/companies:
 *   get:
 *     summary: Listar todas las empresas con filtros
 *     tags: [Companies]
 *     parameters:
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Criterio de ordenación (A-Z, Z-A, category, years)
 *     responses:
 *       200:
 *         description: Lista de empresas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   companyType:
 *                     type: string
 *                   incorporationDate:
 *                     type: string
 *                     format: date
 *                   category:
 *                     type: string
 *                   years:
 *                     type: number
 *                   representative:
 *                     type: object
 *                     properties:
 *                       nameRepre:
 *                         type: string
 *                       position:
 *                         type: string
 *                       contact:
 *                         type: object
 *                         properties:
 *                           email:
 *                             type: string
 *                           phone:
 *                             type: string
 *       500:
 *         description: Error del servidor
 */
router.get("/companies", listCompanies);

/**
 * @swagger
 * /gestorEmpresas/v1/company/companies/{id}:
 *   put:
 *     summary: Actualizar una empresa
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la empresa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               companyType:
 *                 type: string
 *               incorporationDate:
 *                 type: string
 *                 format: date
 *               category:
 *                 type: string
 *               years:
 *                 type: number
 *               representative:
 *                 type: object
 *                 properties:
 *                   nameRepre:
 *                     type: string
 *                   position:
 *                     type: string
 *                   contact:
 *                     type: object
 *                     properties:
 *                       email:
 *                         type: string
 *                       phone:
 *                         type: string
 *     responses:
 *       200:
 *         description: Empresa actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 companyDetails:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     companyType:
 *                       type: string
 *                     incorporationDate:
 *                       type: string
 *                       format: date
 *                     category:
 *                       type: string
 *                     years:
 *                       type: number
 *                     representative:
 *                       type: object
 *                       properties:
 *                         nameRepre:
 *                           type: string
 *                         position:
 *                           type: string
 *                         contact:
 *                           type: object
 *                           properties:
 *                             email:
 *                               type: string
 *                             phone:
 *                               type: string
 *       404:
 *         description: Empresa no encontrada
 *       500:
 *         description: Error del servidor
 */
router.put("/companies/:id", updateCompany);

/**
 * @swagger
 * /gestorEmpresas/v1/company/{id}/report:
 *   get:
 *     summary: Generar un reporte en Excel de una empresa
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la empresa
 *     responses:
 *       200:
 *         description: Reporte generado exitosamente
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Empresa no encontrada
 *       500:
 *         description: Error del servidor
 */
router.get("/:id/report", generateExcel);
export default router;