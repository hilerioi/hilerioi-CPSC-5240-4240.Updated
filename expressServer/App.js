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
exports.App = void 0;
const express = require("express");
const url = require("url");
const bodyParser = require("body-parser");
// Creates and configures an ExpressJS web server.
class App {
    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }
    // Configure Express middleware.
    middleware() {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        }));
    }
    // Configure API endpoints.
    routes() {
        let router = express.Router();
        router.get('/one', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                res.send('request one');
            }
            catch (error) {
                console.log(error);
            }
        }));
        router.get('/add', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                let urlParts = url.parse(req.url, true);
                let query = urlParts.query;
                console.log('var1:' + query.var1);
                console.log('var2:' + query.var2);
                let value1 = parseInt(query.var1);
                let value2 = parseInt(query.var2);
                let sum = value1 + value2;
                //var sum = query.var1 + query.var2;
                var msg = 'addition of ' + query.var1 + ' plus ' + query.var2 + ' equals ' + sum;
                console.log(msg);
                res.send(msg);
            }
            catch (error) {
                console.log(error);
            }
        }));
        router.get('/add2/:var1/:var2', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('var1:' + req.params.var1);
                console.log('var2:' + req.params.var2);
                let value1 = parseInt(req.params.var1);
                let value2 = parseInt(req.params.var2);
                let sum = value1 + value2;
                //var sum = query.var1 + query.var2;
                var msg = 'addition of ' + value1 + ' plus ' + value2 + ' equals ' + sum;
                console.log(msg);
                res.send(msg);
            }
            catch (error) {
                console.log(error);
            }
        }));
        router.post('/add', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                let payload = req.body;
                console.log('var1:' + payload.var1);
                console.log('var2:' + payload.var2);
                let value1 = parseInt(payload.var1);
                let value2 = parseInt(payload.var2);
                let sum = value1 + value2;
                //var sum = query.var1 + query.var2;
                var msg = 'addition of ' + value1 + ' plus ' + value2 + ' equals ' + sum;
                console.log(msg);
                res.send(msg);
            }
            catch (error) {
                console.log(error);
            }
        }));
        let fname2;
        router.get('/name/:fname', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                let name;
                console.log(':fname = ' + req.params.fname);
                if (req.params.fname === 'israelh') {
                    name = fname2 + ' hilerio';
                }
                else {
                    name = fname2 + ' world';
                }
                console.log(name);
                res.send("Your name is: " + name);
            }
            catch (error) {
                console.log(error);
            }
        }));
        router.param('fname', (req, res, next, value) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('The param value is: ' + value);
                fname2 = value + "-ABC";
                next();
            }
            catch (error) {
                console.log(error);
            }
        }));
        this.express.use('/', router);
        this.express.use('/images', express.static(__dirname + '/img'));
        this.express.use('/data', express.static(__dirname + '/json'));
        this.express.use('/', express.static(__dirname + '/pages'));
    }
}
exports.App = App;
//# sourceMappingURL=App.js.map