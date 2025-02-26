# Gestor_de_Empresas

##Indicaciones para Posman

Al iniciar sesion se le dara un Token se mira algo asi:
![Token](https://github.com/user-attachments/assets/95ff7508-25f0-4035-9be4-746e4ecbcbb3)

ese token debera guardarlo para algunas peticiones:
Todas las peticiones de Empresas deben llevar el Token, debe irse a la pestaña headers, Key: x-token, value: Aqui debes insertar tu token
de inicio de sesion, debe verse algo asi:
![Rutas](https://github.com/user-attachments/assets/b06adf7d-587a-47ab-8185-111f4a1c8e21)

debera hacer esto en todas las rutas de empresas, listar, registrar, editar y generar Reporte.

##Editar perfil
Al editar un perfil, debes poner tu id en la ruta de postman, adicional a eso debes poner el token
solo puedes editar tu mismo perfil, no puedes editar el perfil de otros, si lo haces te dara el siguiente error:
![Editar](https://github.com/user-attachments/assets/8b56b904-155f-461d-bf9e-177afda70b75)
