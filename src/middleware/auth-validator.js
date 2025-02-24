import { body } from 'express-validator'
import { validarCampos } from './validar-campos.js'

export const registerValidator = [
    body('name', 'Name is required').not().isEmpty(),
    body('surname', 'Surname is required').not().isEmpty(),
    body('password', "Password must be at least 6 chraracters").isLength({min: 6}),
    validarCampos
];

export const loginValidator = [
    body("password", "Password must be at least 6 characters").isLength({min: 8}),
    validarCampos
]