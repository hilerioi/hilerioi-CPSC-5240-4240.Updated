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
const bodyParser = require("body-parser");
const ListModel_1 = require("./model/ListModel");
const TaskModel_1 = require("./model/TaskModel");
const crypto = require("crypto");
// Creates and configures an ExpressJS web server.
class App {
    //Run configuration methods on the Express instance.
    constructor(mongoDBConnection) {
        this.expressApp = express();
        this.middleware();
        this.routes();
        this.Lists = new ListModel_1.ListModel(mongoDBConnection);
        this.Tasks = new TaskModel_1.TaskModel(mongoDBConnection);
    }
    // Configure Express middleware.
    middleware() {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
        this.expressApp.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
    }
    // Configure API endpoints.
    routes() {
        let router = express.Router();
        router.get('/app/list/:listId/count', (req, res) => __awaiter(this, void 0, void 0, function* () {
            var id = req.params.listId;
            console.log('Query single list with id: ' + id);
            yield this.Tasks.retrieveTasksCount(res, { listId: id });
        }));
        router.get('/app/list/:listId', (req, res) => __awaiter(this, void 0, void 0, function* () {
            var id = req.params.listId;
            console.log('Query single list with id: ' + id);
            yield this.Lists.retrieveLists(res, id);
        }));
        router.post('/app/list/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = crypto.randomBytes(16).toString("hex");
            console.log(req.body);
            var jsonObj = req.body;
            jsonObj.listId = id;
            try {
                yield this.Lists.model.create([jsonObj]);
                res.send('{"id":"' + id + '"}');
            }
            catch (e) {
                console.error(e);
                console.log('object creation failed');
            }
        }));
        router.post('/app/list2/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = crypto.randomBytes(16).toString("hex");
            console.log(req.body);
            var jsonObj = req.body;
            jsonObj.listId = id;
            const doc = new this.Lists.model(jsonObj);
            try {
                yield doc.save();
                res.send('{"id":"' + id + '"}');
            }
            catch (e) {
                console.log('object creation failed');
                console.error(e);
            }
        }));
        router.get('/app/list/:listId', (req, res) => __awaiter(this, void 0, void 0, function* () {
            var id = req.params.listId;
            console.log('Query single list with id: ' + id);
            yield this.Tasks.retrieveTasksDetails(res, { listId: id });
        }));
        router.get('/app/list/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log('Query All list');
            yield this.Lists.retrieveAllLists(res);
        }));
        router.get('/app/listcount', (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log('Query the number of list elements in db');
            yield this.Lists.retrieveListCount(res);
        }));
        this.expressApp.use('/', router);
        this.expressApp.use('/app/json/', express.static(__dirname + '/app/json'));
        this.expressApp.use('/images', express.static(__dirname + '/img'));
        this.expressApp.use('/', express.static(__dirname + '/pages'));
    }
}
exports.App = App;
//# sourceMappingURL=App.js.map