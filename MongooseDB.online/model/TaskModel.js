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
exports.TaskModel = void 0;
const Mongoose = require("mongoose");
class TaskModel {
    constructor(DB_CONNECTION_STRING) {
        this.dbConnectionString = DB_CONNECTION_STRING;
        this.createSchema();
        this.createModel();
    }
    createSchema() {
        this.schema = new Mongoose.Schema({
            listId: String,
            tasks: [
                {
                    description: String,
                    taskId: Number,
                    shared: String,
                    status: String
                }
            ]
        }, { collection: 'tasks' });
    }
    createModel() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Mongoose.connect(this.dbConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });
                this.model = Mongoose.model("Task", this.schema);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    retrieveTasksDetails(response, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = this.model.findOne(filter);
            try {
                const itemArray = yield query.exec();
                response.json(itemArray);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    retrieveTasksCount(response, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = this.model.findOne(filter);
            try {
                const innerTaskList = yield query.exec();
                if (innerTaskList == null) {
                    response.status(404);
                    response.json('{count: -1}');
                }
                else {
                    console.log('number of tasks: ' + innerTaskList.tasks.length);
                    response.json('{count:' + innerTaskList.tasks.length + '}');
                }
            }
            catch (e) {
                console.error(e);
            }
        });
    }
}
exports.TaskModel = TaskModel;
//# sourceMappingURL=TaskModel.js.map