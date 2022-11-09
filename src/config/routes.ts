/* eslint-disable */ 

export interface RouteDefinition {
	path: string;
    method: 'get' | 'post' | 'delete' | 'put' | 'use' | 'all';
    methodName: string;
}

export const BASE_PATH: string = '';
export const Middlewares = (): void => {
    require("../api/middlewares/api.middleware");
   // require("../api/middlewares/auth.middleware");

}

export const Controllers = () => {
    require('../api/controllers/main.controller');
    // require('../api/controllers/file.controller');
   // require('../api/controllers/org.controller');
    //require('../api/controllers/files.controller');
}