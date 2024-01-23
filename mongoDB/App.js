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
const mongodb_1 = require("mongodb");
// Creates and configures an ExpressJS web server.
class App {
    //Run configuration methods on the Express instance.
    constructor(mongoDBConnection) {
        this.client = null;
        this.mongoDBConnection = mongoDBConnection;
        this.expressApp = express();
        this.middleware();
        this.openDbConnection();
        this.routes();
    }
    openDbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("before starting mongo client");
            this.client = new mongodb_1.MongoClient(this.mongoDBConnection);
            try {
                //Connects to the MongoDB Cluster
                yield this.client.connect();
                //Sample DB call
                let databasesList = yield this.client.db().admin().listDatabases();
                databasesList.databases.forEach(db => {
                    console.log(` - ${db.name}`);
                });
            }
            catch (e) {
                console.error(e);
            }
            finally {
                yield this.client.close();
            }
        });
    }
    // Configure Express middleware.
    middleware() {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    }
    accessTransportation(res, payload, api) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("query Transportation");
            try {
                yield this.client.connect();
                try {
                    console.log("Using Connection");
                    const db = yield this.client.db('classSample');
                    const nCollection = yield db.collection('carCollection');
                    let query = payload;
                    if (api == "query") {
                        try {
                            const cursor = yield nCollection.find(query);
                            try {
                                const itemArray = yield cursor.toArray();
                                /*                const list = "<h1>Request</h1>";
                                                  for (var i = 0; i < itemArray.length; i++) {
                                                      list += "<h3>" + itemArray[i].vehicle + " : " + itemArray[i].speed + "mph</h3>";
                                                  }
                                */
                                const list = JSON.stringify(itemArray);
                                return (list);
                            }
                            catch (e2) {
                                console.error(e2);
                            }
                        }
                        catch (e1) {
                            console.error(e1);
                        }
                    }
                    else if (api == "insert") {
                        console.log("inserting payload:" + payload);
                        try {
                            yield nCollection.insert(payload);
                            return ({ "result": "record added" });
                        }
                        catch (e1) {
                            console.error(e1);
                            return ({ "result": "error inserting record" });
                        }
                    }
                    else if (api == "delete") {
                        console.log("deleting payload:" + JSON.stringify(payload));
                        try {
                            const obj = yield nCollection.deleteOne(payload);
                            res.statusCode = 200;
                            return ({ "result": "deleted" });
                        }
                        catch (e1) {
                            console.error(e1);
                            return ({ "result": "error deleting" });
                        }
                    }
                    else {
                        return ({ "result": "invalid API Call" });
                    }
                }
                catch (e0) {
                    console.error(e0);
                }
            }
            catch (e) {
                console.error(e);
            }
            finally {
                this.client.close();
            }
        });
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
        router.get('/all', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const list = yield this.accessTransportation(res, {}, "query");
                res.send(list);
            }
            catch (e) {
                console.error(e);
            }
        }));
        router.post('/add', (req, res) => __awaiter(this, void 0, void 0, function* () {
            let bodyRequest = req.body;
            try {
                const result = yield this.accessTransportation(res, bodyRequest, "insert");
                res.send(result);
            }
            catch (e) {
                console.error(e);
            }
        }));
        router.delete('/remove', (req, res) => __awaiter(this, void 0, void 0, function* () {
            let bodyRequest = req.body;
            try {
                const result = yield this.accessTransportation(res, bodyRequest, "delete");
                res.send(result);
            }
            catch (e) {
                console.error(e);
            }
        }));
        router.get('/search', (req, res) => __awaiter(this, void 0, void 0, function* () {
            var urlParts = url.parse(req.url, true);
            var query = urlParts.query;
            var msg = 'search for ' + query.var1;
            console.log("search param: " + msg);
            try {
                const list = yield this.accessTransportation(res, { speed: query.var1 }, "query");
                res.send(list);
            }
            catch (e) {
                console.error(e);
            }
        }));
        router.get('/vehicle/:vname', (req, res) => __awaiter(this, void 0, void 0, function* () {
            var vname = req.params.vname;
            console.log('Query for vehicle name: ' + vname);
            try {
                const list = yield this.accessTransportation(res, { vehicle: vname }, "query");
                res.send(list);
            }
            catch (e) {
                console.error(e);
            }
        }));
        router.param('vname', (req, res, next, value) => {
            console.log('The param value is: ' + value);
            next();
        });
        this.expressApp.use('/', router);
        this.expressApp.use('/images', express.static(__dirname + '/img'));
        this.expressApp.use('/', express.static(__dirname + '/pages'));
    }
}
exports.App = App;
//# sourceMappingURL=App.js.map