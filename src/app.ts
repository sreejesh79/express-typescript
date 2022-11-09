/* eslint-disable */ 
import "reflect-metadata";
import * as http from 'http';
import * as https from 'https';
import express, {Router} from 'express';
import bodyParser from 'body-parser'; //used to parse the form data that you pass in the request
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import { Log, ErrorLog } from './config/logger';
import Bootstrap from 'config/bootstrap';
import * as path from 'path';
import * as fs from 'fs';
import { Middlewares, Controllers } from './config/routes';
import Environment from './config/environment';
import { router } from './decorators/controller.decorator'
import { mwRouter } from './decorators/middleware.decorator';
import { ErrorHandler } from "config/errors";
import { Logger } from 'config/logger';

class App {

    public _app: express.Application;
    protected _port: string
    constructor() {
        global.__basepath = path.join(__dirname, '../');
        this._app = express();
        this.config(this._app);
    }

    private async config(app) {
        Environment.init();
        Logger.init();
        // Middlewares
        Middlewares();
        // import controllers
        Controllers();
        // middlewares
        app.use(helmet())
        // support application/json type post data
        app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        app.use(bodyParser.urlencoded({
            extended: false
        }));

        app.use(cookieParser());
        //Enables cors   
        app.use(cors());

        Log(app);
        app.use(mwRouter);
        app.use(router);
        ErrorLog(app);
        ErrorHandler.init(app);
        // db connection
       // await this.initDbConnections();
       
        // bootsrap before the server is up.
        // await Bootstrap.init();
        this.listen();
    }
    private listen() {
        this._port = process.env.PORT;
        const isProduction = (process.env.NODE_ENV === 'production');
        if (!isProduction) {
            const httpServer = http.createServer(this._app);
            httpServer.listen(this._port, () => {
               // Logger.info(`App listening on the http://localhost:${this._port}`);
               console.log('\x1b[35mINFO\x1b[0m',`App listening on  http://localhost:${this._port}/api/v1`);
            })
        } else {
            const httpsServer = https.createServer({
                key: fs.readFileSync(process.env.SSL_KEY),
                cert: fs.readFileSync(process.env.SSL_CERT),
              }, this._app);
              httpsServer.listen(this._port, () => {
                Logger.info(`App listening on the http://localhost:${this._port}/api/v1`);
                });
        }
        
    }

}

const server: App = new App();