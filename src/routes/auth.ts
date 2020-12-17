import {Router} from 'express'
import authController from '../controller/authController'
const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('../config/config');

export function isAuth (req, res, next) {
if (!req.headers.authorization) {
    return res.status(403).json({ message: 'No estas autorizado'})
    }
    const token = req.headers.authorization.split(" ")[1]
    const payload = jwt.decode(token, config.jwtSecret)

    if (payload.exp < moment().unix()) {
        return res.status(401).json({ message: 'El token ha expirado'})
    };

    req.user = payload.sub
    next()
}

  



const router = Router()

// login

router.post('/login', authController.login);
export default router;