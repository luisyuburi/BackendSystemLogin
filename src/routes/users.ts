import {UserController} from '../controller/UserController';
import {Router} from 'express';
import {checkJwt} from '../middlewares/jwt';
const router = Router();
import { isAuth } from './auth' 



// Get all users
router.get('/', [checkJwt], UserController.getAll);

// Get one user
router.get('/:id', [checkJwt], UserController.getById);


// Create a new user
router.post('/', UserController.newUser);


// Edit user
router.patch('/:id', UserController.editUser);

// Delete user
router.delete('/:id', [checkJwt], UserController.deleteUser);

router.get('/private', isAuth,  function(req, res) {
    res.status(200).json({message: 'Tienes acceso'})
 }); 

export default router;

