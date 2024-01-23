"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const fs = require("node:fs/promises");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;
http.createServer((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.setHeader('Content-Type', "text/html");
    res.writeHead(200);
    let filename = req.url;
    console.log('filename:' + filename);
    if (filename === '/') {
        filename = 'index.html';
    }
    console.log('filename: ' + filename);
    try {
        const data = yield fs.readFile('./pages/' + filename, { encoding: 'utf8' });
        console.log('successfully retrieve request info.');
        res.end(data);
    }
    catch (e) {
        console.error(e);
    }
})).listen(port);
console.log("Server started listening in port " + port);
//# sourceMappingURL=nServer.js.map