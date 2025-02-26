import {Router} from 'express'
import auth from './auth';
import user from './users';


const routes = Router();

routes.use('/auth', auth);
routes.use('/users', user)



export default routes;