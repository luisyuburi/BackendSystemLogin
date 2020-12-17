import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken';
import config from '../config/config';



export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    console.log('REQ =>',  req.headers); 

    const token = <string>req.headers['auth'];
    let jwtPayLoad;

    try{
        jwtPayLoad = <any>jwt.verify(token, config.jwtSecret); 
        res.locals.jwtPayLoad = jwtPayLoad;

        const {id, email} = jwtPayLoad;
    const newToken = jwt.sign({ id, email }, config.jwtSecret, { expiresIn: '1h' });
    res.setHeader('token', newToken);

    }
    catch(e) {
        return res.status(401).json({ message: 'Not authorized'});
    }

    
    

    // Call next
    next();


}

