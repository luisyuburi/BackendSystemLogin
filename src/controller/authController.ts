import {getRepository} from 'typeorm'
import {Request, Response} from 'express'
import {User} from '../entity/User'
import * as jwt from 'jsonwebtoken'
import config from '../config/config'
class authController {
    static login = async (req: Request, res: Response) => {
        const {email, password} = req.body;

        if(!(email && password )) {
            res.status(400).json({ message: 'Email & Password are required'});
        }
        const userRepository = getRepository(User);

        let user : User;

        try{
            user = await userRepository.findOneOrFail({ where:{email: email }});
        }
        catch(e){
            return res.status(400).json ({ message: 'Email or Password incorrect!'})
        }

        const token = jwt.sign({id: user.id, email: user.email}, config.jwtSecret, {expiresIn: '1h'})

        // Check password
        if(!user.checkPassword(password)){
            return res.status(400).json({ message: 'Email or Password incorrect!'})
        }
        
        
        res.send({ message: 'OK', token, userid: user.id })
        
    };
}

export default authController;