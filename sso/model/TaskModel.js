Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskModel = void 0;
const Mongoose = require("mongoose");
const DataAccess_1 = require("./../DataAccess");
let mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
let mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
class TaskModel {
    constructor() {
        this.createSchema();
        this.createModel();
    }
    createSchema() {
        this.schema = new Mongoose.Schema({
            listId: Number,
            tasks: [{
                    description: String,
                    taskId: Number,
                    shared: String,
                    status: String
                }]
        }, { collection: 'tasks' });
    }
    createModel() {
        this.model = mongooseConnection.model("Task", this.schema);
    }
    retrieveTasksDetails(response, filter) {
        var query = this.model.findOne(filter);
        query.exec((err, itemArray) => {
            response.json(itemArray);
        });
    }
    retrieveTasksCount(response, filter) {
        var query = this.model.find(filter).select('tasks').count();
        query.exec((err, numberOfTasks) => {
            console.log('number of tasks: ' + numberOfTasks);
            response.json(numberOfTasks);
        });
    }
}
exports.TaskModel = TaskModel;
