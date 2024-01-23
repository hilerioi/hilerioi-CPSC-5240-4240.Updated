import * as express from 'express';
import * as url from 'url';
import * as bodyParser from 'body-parser';
import { MongoClient } from 'mongodb'

// Creates and configures an ExpressJS web server.
class App {
  // ref to Express instance
  public expressApp: express.Application;
  public mongoDBConnection:string; // = 'mongodb://dbAdmin/test@localhost:3000/classSample';
  public client: any = null;

  //Run configuration methods on the Express instance.
  constructor(mongoDBConnection:string) {
    this.mongoDBConnection = mongoDBConnection;
    this.expressApp = express();
    this.middleware();
    this.openDbConnection();
    this.routes();
  }

  public async openDbConnection() {
      console.log("before starting mongo client");
      this.client = new MongoClient(this.mongoDBConnection);
      try {
        //Connects to the MongoDB Cluster
        await this.client.connect();
        //Sample DB call
        let databasesList = await this.client.db().admin().listDatabases();
        databasesList.databases.forEach(db => {
          console.log(` - ${db.name}`);
        });
      }
      catch (e) {
        console.error(e);
      }
      finally {
        await this.client.close();
      }
  }

  // Configure Express middleware.
  private middleware(): void {
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({ extended: false }));
  }

  public async accessTransportation(res, payload, api)  {
    console.log("query Transportation");

    try{
      await this.client.connect();

      try{
        console.log("Using Connection")
        const db = await this.client.db('classSample');        
        const nCollection = await db.collection('carCollection');

        let query = payload;
        if (api == "query") {
          try {
            const cursor = await nCollection.find(query);
            try {
              const itemArray = await cursor.toArray();
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
            await nCollection.insert(payload);
            return ({"result": "record added"});
          }
          catch(e1) {
            console.error(e1);
            return ({"result": "error inserting record"});
          }
        }
        else if (api == "delete") {
          console.log("deleting payload:" + JSON.stringify(payload));
          try{
            const obj = await nCollection.deleteOne(payload);
              res.statusCode = 200;
              return ({"result": "deleted"});
          }
          catch (e1) {
            console.error(e1);
            return ({"result": "error deleting"});
          }
        }
        else {
          return ({"result": "invalid API Call"});
        }
      }
      catch (e0) {
            console.error(e0);
      }
    }
    catch(e) {
      console.error(e);
    }
    finally {
      this.client.close();
    }
  }

  // Configure API endpoints.
  private routes(): void {
    let router = express.Router();

    router.get('/one', async (req, res, next) => {
      try {
        res.send('request one');
      } catch (error) {
        console.log(error);
      }
    });

    
    router.get('/all', async (req, res) => {
      try {
        const list = await this.accessTransportation(res, {}, "query");
        res.send(list);
      }
      catch (e){
        console.error(e);
      }
    });

    router.post('/add', async (req, res) => {
      let bodyRequest = req.body;
      try {
        const result = await this.accessTransportation(res, bodyRequest, "insert");
        res.send(result); 
      } 
      catch (e) {
        console.error(e);
      }
    });

    router.delete('/remove', async (req, res) =>{
      let bodyRequest = req.body;
      try {
        const result = await this.accessTransportation(res, bodyRequest, "delete");
        res.send(result); 
      }
      catch (e) {
        console.error(e);
      }
    });

    router.get('/search', async (req, res) => {
        var urlParts = url.parse(req.url, true);
        var query = urlParts.query;
        var msg = 'search for ' + query.var1;
        console.log("search param: " + msg);
        try {
          const list = await this.accessTransportation(res, {speed: query.var1}, "query");
          res.send(list);
        }
        catch (e) {
          console.error(e);
        }
    });

    router.get('/vehicle/:vname', async (req, res) => {
        var vname = req.params.vname;
        console.log('Query for vehicle name: ' + vname);
        try {
          const list = await this.accessTransportation(res, {vehicle: vname}, "query");
          res.send(list);
        }
        catch (e) {
          console.error(e);
        }
    });

    router.param('vname', (req, res, next, value) => {
        console.log('The param value is: ' + value);
        next();
    });

    this.expressApp.use('/', router);

    this.expressApp.use('/images', express.static(__dirname+'/img'));
    this.expressApp.use('/', express.static(__dirname+'/pages'));
  }

}

export {App};