import * as Mongoose from "mongoose";
import {IListModel} from '../interfaces/IListModel';

class ListModel {
    public schema:any;
    public model:any;
    public dbConnectionString:string;

    public constructor(DB_CONNECTION_STRING:string) {
        this.dbConnectionString = DB_CONNECTION_STRING;
        this.createSchema();
        this.createModel();
    }

    public createSchema() {
        this.schema = new Mongoose.Schema(
            {
                name: String,
                description: String,
                listId: String,
                due: String,
                state: String,
                owner: String
            }, {collection: 'lists'}
        );    
    }

    public async createModel() {
        try {
            await Mongoose.connect(this.dbConnectionString, {useNewUrlParser: true, useUnifiedTopology: true});
            this.model = Mongoose.model<IListModel>("Lists", this.schema);
        }
        catch (e) {
            console.error(e);
        }
    }

    public async retrieveAllLists(response:any) {
        var query = this.model.find({});
        // query.where("state");
        // query.lt("B");
        try {
            const itemArray = await query.exec();
            response.json(itemArray);
        }
        catch(e) {
            console.error(e);
        }
    }

    public async retrieveLists(response:any, value:number) {
        var query = this.model.findOne({listId: value});
        try {
            const result = await query.exec();
            response.json(result) ;
        }
        catch (e) {
            console.error(e);
        }
    }

    public async retrieveListCount(response:any) {
        console.log("retrieve List Count ...");
        var query = this.model.estimatedDocumentCount();
        try {
            const numberOfLists = await query.exec();
            console.log("numberOfLists: " + numberOfLists);
            response.json(numberOfLists);
        }
        catch (e) {
            console.error(e);
        }
    }
}
export {ListModel};