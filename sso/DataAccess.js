Object.defineProperty(exports, "__esModule", { value: true });
exports.DataAccess = void 0;
const Mongoose = require("mongoose");
class DataAccess {
    constructor() {
        //DataAccess.connect();
    }
    static connect() {
        if (this.mongooseInstance)
            return this.mongooseInstance;
        this.mongooseConnection = Mongoose.connection;
        this.mongooseConnection.on("open", () => {
            console.log("Connected to mongodb.");
        });
        this.mongooseInstance = Mongoose.connect(this.DB_CONNECTION_STRING);
        return this.mongooseInstance;
    }
}
exports.DataAccess = DataAccess;
//    static DB_CONNECTION_STRING:string = 'mongodb://dbAdmin:test@localhost:3000/toDoSample?authSource=admin';
//    static DB_CONNECTION_STRING:string = 'mongodb+srv://test:test@cluster0.wvyas.azure.mongodb.net/todoappsu3?retryWrites=true&w=majority&authSource=admin';
//    static DB_CONNECTION_STRING:string = 'mongodb+srv://test:dbtest@cluster0.wvyas.azure.mongodb.net/todoappsu3?retryWrites=true&w=majority';
//    static DB_CONNECTION_STRING:string = 'mongodb+srv://test:dbtest@cluster0.wvyas.azure.mongodb.net/toDoSample?retryWrites=true&w=majority';
DataAccess.DB_CONNECTION_STRING = 'mongodb+srv://test:SeattleuPassword1su@cluster0.wvyas.azure.mongodb.net/toDoSample2022?retryWrites=true&w=majority';
DataAccess.connect();
