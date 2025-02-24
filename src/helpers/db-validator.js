import Usuario from '../user/user.model.js'

export const existeUsuarioById = async (id = '') => {
    const existeUsuario = await Usuario.findById(id);

    if(!existeUsuario){
        throw new Error(`El usuario con el id ${id} no existe en la base de datos`)
    }
}