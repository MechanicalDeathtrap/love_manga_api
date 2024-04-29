import {body} from 'express-validator'

export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль длджен быть минимум 5 символов').isLength({min: 5}),
    body('name', 'Укажите имя, не менее 3 символов').isLength({min: 3}),
    body('avatarUrl', 'Неверная ссылка на аватврку').optional().isURL(),
    body('userDescription').optional(),
    body('isAdmin')
]

export const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({min: 5})
]

export const settingsValidation = [
    body('name', 'Укажите имя, не менее 3 символа').isLength({min: 3}),
    body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(),
    body('userDescription').optional(),
]