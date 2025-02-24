import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options ={
    swaggerDefinition:{
        openapi:"3.0.0",
        info:{
            title: "Gestor de empresas API",
            version: "1.0.0",
            description: "API para un sistema de gestión de clientes y empresas",
            contact:{
                name: "Alexis Monroy",
                email: "amonroy-2023021@kinal.org.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3000/gestorEmpresas/v1"
            }
        ]
    },
    apis:[
        "./src/auth/auth.routes.js",
        "./src/user/user.routes.js"
    ]
}

const swaggerDocs = swaggerJSDoc(options)

export { swaggerDocs, swaggerUi}