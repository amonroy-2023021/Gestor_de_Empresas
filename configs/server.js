'use strict'

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import authRoutes from '../src/auth/auth.routes.js';
import userRouter from '../src/user/user.routes.js';
import companyRouter from '../src/companys/company.routes.js'
import { swaggerDocs, swaggerUi } from "./swagger.js";

const middlewares = (app) => {
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"] 
    }))
    app.use(helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'", `http://localhost:${process.env.PORT}`],
                connectSrc: ["'self'", `http://localhost:${process.env.PORT}`],
                imgSrc: ["'self'", "data:"],
                styleSrc: ["'self'", "'unsafe-inline'"]
            },
        },
    }))
    app.use(morgan("dev"))
}
const routes = (app) => {
    app.use('/gestorEmpresas/v1/auth', authRoutes),
    app.use('/gestorEmpresas/v1/user', userRouter),
    app.use('/gestorEmpresas/v1/company', companyRouter)
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

}


const conectarDB = async() => {
    try{
        await dbConnection();
        console.log('Conexion exitosa con la base de datos');
    }catch (error) {
        console.log('Error al conectar con la base de datos', error);
    }

}

export const initServer = () => {
    const app = express();
    try {
        middlewares(app);
        conectarDB();
        routes(app);
        const port = process.env.PORT || 3000
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (err) {
        console.log(`Server init failed: ${err}`);
    }
}