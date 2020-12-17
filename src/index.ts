import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import {Request, Response} from "express";
import * as cors from 'cors';
import * as helmet from 'helmet';
import routes from '../src/routes'
import { dirname } from "path";



const PORT = process.env.PORT || 3306;

createConnection().then(async () => {

    // create express app
    const app = express();
    //Middlewares
    app.use(cors());
    app.use(helmet());

    app.use(express.json());

    app.get('/', (req, res) => {
        res.send('Funciono')
      })

    // Routes

    

     app.use('/', routes);
    
    // start express server
    app.listen(PORT,  () => {
        console.log('Server running on port ' + PORT);
        
    });

}).catch(error => console.log(error));



