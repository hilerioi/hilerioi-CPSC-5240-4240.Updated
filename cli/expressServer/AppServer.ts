import * as path from 'path';
import * as express from 'express';
import * as url from 'url';
import * as bodyParser from 'body-parser';
import {App} from './App';

const port = 8080;
let server: any = new App().express;
server.listen(port);
console.log("Server running in port " + port);
