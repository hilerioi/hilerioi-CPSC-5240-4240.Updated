import * as dotenv from 'dotenv';
import {App} from './App';

dotenv.config();

const port = process.env.PORT;

let server: any = new App().express;
server.listen(port);
console.log("server running in port " + port);