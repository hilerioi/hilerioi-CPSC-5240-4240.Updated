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
exports.ListModel = void 0;
const Mongoose = require("mongoose");
class ListModel {
    constructor(DB_CONNECTION_STRING) {
        this.dbConnectionString = DB_CONNECTION_STRING;
        this.createSchema();
        this.createModel();
    }
    createSchema() {
        this.schema = new Mongoose.Schema({
            name: String,
            description: String,
            listId: String,
            due: String,
            state: String,
            owner: String
        }, { collection: 'lists' });
    }
    createModel() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Mongoose.connect(this.dbConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });
                this.model = Mongoose.model("Lists", this.schema);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    retrieveAllLists(response) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = this.model.find({});
            // query.where("state");
            // query.lt("B");
            try {
                const itemArray = yield query.exec();
                response.json(itemArray);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    retrieveLists(response, value) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = this.model.findOne({ listId: value });
            try {
                const result = yield query.exec();
                response.json(result);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    retrieveListCount(response) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("retrieve List Count ...");
            var query = this.model.estimatedDocumentCount();
            try {
                const numberOfLists = yield query.exec();
                console.log("numberOfLists: " + numberOfLists);
                response.json(numberOfLists);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
}
exports.ListModel = ListModel;
//# sourceMappingURL=ListModel.js.map