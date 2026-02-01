const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        // 1. Read the file to display messages at the top
        fs.readFile('message.txt', { encoding: 'utf-8' }, (err, data) => {
            if (err) {
                data = 'No messages yet';
            }
            
            res.write('<html>');
            res.write('<head><title>Enter Message</title></head>');
            res.write('<body>');
            // Display the message from the file
            res.write(`<div>${data}</div>`);
            res.write('<form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form>');
            res.write('</body>');
            res.write('</html>');
            return res.end();
        });
    }

    else if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });

        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            
            // 2. Write the new message to the file
            fs.writeFile('message.txt', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }
    
    // Default response if no route matches (optional, but good practice)
    else {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html><body><h1>Page not found</h1></body></html>');
        res.end();
    }
};

// EXPORT this function so app.js can use it
module.exports = requestHandler;