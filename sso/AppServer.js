Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("./App");
let server = new App_1.App().expressApp;
server.listen(process.env.PORT || 8080);
console.log("Server running on port: 8080 or Azure port");
