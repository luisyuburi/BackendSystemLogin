import {getRepository} from "typeorm";
import {Request, Response} from "express";
import {User} from "../entity/User";
import {validate} from 'class-validator';
import {Router} from 'express';
export class UserController {

static getAll = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);
    const users = await userRepository.find();

    if(users.length > 0 ) {
        res.send(users);
    } else{
        res.status(404).json({ message: 'Not result'});
    }
        
};

static getById = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);
    const {id} = req.params;

    try{
        const user = await userRepository.findOneOrFail(id);
        res.send(user);
    }
    catch(e) {
        res.status(404).json({ message: 'Not result'});
    }

};

static newUser = async (req: Request, res: Response) => {
    const {nombre, apellido, email, password} = req.body;

    const user = new User;

    user.nombre = nombre;
    user.apellido = apellido;
    user.email = email;
    user.password = password;

    // Validate
    const validationOp = {validationError:{ target: false, value: false } };
    const errors = await validate(user, validationOp);

    if (errors.length > 0) {
        return res.status(400).json(errors);

    }

    // To Do: HASH PASSWORD


    const userRepository = getRepository(User)

    try{
        user.hashPassword();
        await userRepository.save(user);
    }
    catch(e) {
        return res.status(409).json({ message: 'Ha ocurrido un error'})
    }

    // all
    return res.status(200).json({ message: 'Usuario creado exitosamente'})



};

static editUser = async (req: Request, res: Response) => {
    let user;
    const {id} = req.params;
    const {nombre, apellido, email, password} = req.body;

    const userRepository = getRepository(User);

    // Try get user

    try{
        user = await userRepository.findOneOrFail(id);
    }
    catch(e) {
        return res.status(404).json({ message: 'User not found'})
    }
    user.nombre = nombre;
    user.apellido - apellido;
    user.email = email;
    user.password = password;   


    const validationOp = {validationError:{ target: false, value: false } };
    const errors = await validate(user, validationOp);
      
    if(errors.length > 0) {
        return res.status(400).json(errors);
    }

    // Try to save user

    try{
        await userRepository.save(user)
    }
    catch(e) {
        return res.status(409).json({ message: ' User already in use'})
    }

    res.status(201).json({ message: 'User Update succesfully! '})

};

static deleteUser = async (req: Request, res: Response) => {
  const  { id } = req.params;
  const userRepository = getRepository(User);
 let user : User;

  try{
    user = await userRepository.findOneOrFail(id);
  }
  catch(e) {
    res.status(404).json({ message: 'User nor found'}
    )}

  // Remove user
  userRepository.delete(id);
  res.status(201).json({ message: 'User deleted succesfully!'})
}
};

export default UserController;





