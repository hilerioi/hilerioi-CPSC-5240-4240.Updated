import Mongoose = require("mongoose");

interface ITaskModel extends Mongoose.Document {
    listId: string;
    tasks: [ {
        description: string;
        taskId: number;
        shared: string;
        status: string;
    }];
}
export {ITaskModel};
