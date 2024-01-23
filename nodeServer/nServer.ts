import * as http from 'http';
import * as fs from 'node:fs/promises';
import * as dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT;

http.createServer( async (req, res) => {
	res.setHeader('Content-Type', "text/html");
	res.writeHead(200);

	let filename = req.url;
	console.log('filename:' + filename);
	
	if (filename === '/') {
		filename = 'index.html';
	}
	
	console.log('filename: ' + filename);
	
	try {
		const data = await fs.readFile('./pages/' + filename, {encoding: 'utf8'});
		console.log('successfully retrieve request info.');
		res.end(data);
	}
	catch (e) {
		console.error(e);		
	}
	
}).listen(port);
console.log("Server started listening in port " + port);