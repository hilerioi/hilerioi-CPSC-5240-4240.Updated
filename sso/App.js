Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const ListModel_1 = require("./model/ListModel");
const TaskModel_1 = require("./model/TaskModel");
const GooglePassport_1 = require("./GooglePassport");
const passport = require("passport");
// Creates and configures an ExpressJS web server.
class App {
    //Run configuration methods on the Express instance.
    constructor() {
        this.googlePassportObj = new GooglePassport_1.default();
        this.expressApp = express();
        this.middleware();
        this.routes();
        this.idGenerator = 102;
        this.Lists = new ListModel_1.ListModel();
        this.Tasks = new TaskModel_1.TaskModel();
    }
    // Configure Express middleware.
    middleware() {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
        this.expressApp.use(session({ secret: 'keyboard cat' }));
        this.expressApp.use(cookieParser());
        this.expressApp.use(passport.initialize());
        this.expressApp.use(passport.session());
    }
    validateAuth(req, res, next) {
        if (req.isAuthenticated()) {
            console.log("user is authenticated");
            return next();
        }
        console.log("user is not authenticated");
        res.redirect('/');
    }
    // Configure API endpoints.
    routes() {
        let router = express.Router();
        router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));
        router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
            console.log("successfully authenticated user and returned to callback page.");
            console.log("redirecting to /#/list");
            res.redirect('/#/list');
        });
        router.get('/app/user/info', this.validateAuth, (req, res) => {
            console.log('Query All list');
            console.log("user info:" + JSON.stringify(req.user));
            console.log("user info:" + JSON.stringify(req.user.id));
            console.log("user info:" + JSON.stringify(req.user.displayName));
            res.json({ "username": req.user.displayName, "id": req.user.id });
        });
        router.get('/app/list/:listId/count', (req, res) => {
            var id = req.params.listId;
            console.log('Query single list with id: ' + id);
            this.Tasks.retrieveTasksCount(res, { listId: id });
        });
        router.post('/app/list/', (req, res) => {
            console.log(req.body);
            var jsonObj = req.body;
            //jsonObj.listId = this.idGenerator;
            this.Lists.model.create([jsonObj], (err) => {
                if (err) {
                    console.log('object creation failed');
                }
            });
            res.send(this.idGenerator.toString());
            this.idGenerator++;
        });
        router.get('/app/list/:listId', (req, res) => {
            var id = req.params.listId;
            console.log('Query single list with id: ' + id);
            this.Tasks.retrieveTasksDetails(res, { listId: id });
        });
        router.get('/app/list/', this.validateAuth, (req, res) => {
            console.log('Query All list');
            console.log("user info:" + JSON.stringify(req.user));
            console.log("user info:" + JSON.stringify(req.user.id));
            console.log("user info:" + JSON.stringify(req.user.displayName));
            this.Lists.retrieveAllLists(res);
        });
        router.get('/app/listcount', (req, res) => {
            console.log('Query the number of list elements in db');
            this.Lists.retrieveListCount(res);
        });
        this.expressApp.use('/', router);
        this.expressApp.use('/app/json/', express.static(__dirname + '/app/json'));
        this.expressApp.use('/images', express.static(__dirname + '/img'));
        this.expressApp.use('/', express.static(__dirname + '/angularDist'));
        //    this.expressApp.use('/', express.static(__dirname+'/pages'));
    }
}
exports.App = App;
