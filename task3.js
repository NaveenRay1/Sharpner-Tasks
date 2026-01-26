const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url;
    

    res.setHeader('Content-Type', 'text/html');

    if (url === '/home') {
        res.write('<html><body><h1>Welcome home</h1></body></html>');
    } else if (url === '/about') {
        res.write('<html><body><h1>Welcome to About Us</h1></body></html>');
    } else if (url === '/node') {
        res.write('<html><body><h1>Welcome to my Node Js project</h1></body></html>');
    } else if (url === '/') {
        res.write('<html><body><h1>Hello World</h1></body></html>');
    } else if (url === '/pizza') {
        res.write('<html><body><h1>This is your pizza</h1></body></html>');
    } else {
        // Task requirement for anything else
        res.write('<html><body><h1>Page Not Found</h1></body></html>');
    }

    res.end();
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});