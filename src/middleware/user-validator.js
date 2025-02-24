import User from '../user/user.model.js'

export const onlyOneUser = async(req, res, next) => {
    const { id } = req.params;
    const authenticatedUser = req.user.id;

    try {
        if(authenticatedUser !== id){
            return res.status(403).json({
                success: false,
                msg: "Solo puede editar su perfil"
            })
        }
    
        next();

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error al modificar el usuario"
        })
    }
}