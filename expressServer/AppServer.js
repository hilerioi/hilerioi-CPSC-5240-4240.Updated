"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const App_1 = require("./App");
dotenv.config();
const port = process.env.PORT;
let server = new App_1.App().express;
server.listen(port);
console.log("server running in port " + port);
//# sourceMappingURL=AppServer.js.map