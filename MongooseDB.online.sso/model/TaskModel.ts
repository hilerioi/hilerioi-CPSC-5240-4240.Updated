import * as Mongoose from "mongoose";
import {ITaskModel} from '../interfaces/ITaskModel';

class TaskModel {
    public schema:any;
    public innerSchema:any;
    public model:any;
    public dbConnectionString:string;

    public constructor(DB_CONNECTION_STRING:string) {
        this.dbConnectionString = DB_CONNECTION_STRING;
        this.createSchema();
        this.createModel();
    }

    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                listId: Number,
                tasks: [
                    {
                        description: String,
                        taskId: Number,
                        shared: String,
                        status: String
                    }        
                ]
            }, {collection: 'tasks'}
        );
    }

    public async createModel() {
        try {
            await Mongoose.connect(this.dbConnectionString, {useNewUrlParser: true, useUnifiedTopology: true});
            this.model = Mongoose.model<ITaskModel>("Task", this.schema);    
        }
        catch (e) {
            console.error(e);        
        }
    }
    
    public async retrieveTasksDetails(response:any, filter:object) {
        var query = this.model.findOne(filter);
        try {
            const itemArray = await query.exec();
            response.json(itemArray);
        }
        catch (e) {
            console.error(e);
        }
    }

    public async retrieveTasksCount(response:any, filter:Object) {
        var query = this.model.findOne(filter);
        try {
            const innerTaskList = await query.exec();
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
    }
}
export {TaskModel};