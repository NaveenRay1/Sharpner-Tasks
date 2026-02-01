const http = require('http');

// Import the logic from your new file
const routes = require('./routes');

// Pass the routes function to the server
const server = http.createServer(routes);

console.log('Server is running on port 3000');
server.listen(3000);