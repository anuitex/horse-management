//Vendors
import * as bodyParser from 'body-parser';
import cors from "cors";
import express, { Application } from "express";
import helmet from 'helmet';
import morgan from 'morgan';
import {createServer, Server} from 'http'; 
import * as io from 'socket.io'; 
//Constants
import { ApiEndpointsConstants } from './config/api-endpoints.constants';
import "./config/db";
//Routes
import { horseManagementRouter } from "./features/horse-management/horse-management.routes";
//Helpers


class App {
    public express: Application;
    public server: Server; 
    public io: io.Server; 

    constructor() {
        this.express = express();
        this.server = createServer(this.express);
        this.io = new io.Server(this.server, {
            cors: {
            origin: "*", 
            allowedHeaders: ["Content-Type", "Origin", "Accept", "X-Requested-With"], 
            }
        });
        this.setMiddleware();
        this.setRoutes();
        this.catchErrors();
    }

    private setMiddleware(): void {
        this.express.use(cors());
        this.express.use(morgan("dev"));
        this.express.use(bodyParser.json({ limit: '10mb' }));
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(helmet());
    }

    private setRoutes(): void {
        const getUrl = (route: string): string => ApiEndpointsConstants.API + route;

        this.express.use(getUrl(ApiEndpointsConstants.MANAGEMENT_FEATURE), horseManagementRouter)
    }

    private catchErrors(): void {
    }
}

export default new App();