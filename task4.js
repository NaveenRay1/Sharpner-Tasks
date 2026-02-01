const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/message' && method === 'POST') {
        const body = [];
        
        // Step 1: Listen for data chunks (The Stream)
        req.on('data', (chunk) => {
            body.push(chunk);
        });

        // Step 2: Once all chunks are received (The Buffer)
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1]; // Extracts the value from "message=yourText"

            // Step 3: Write to file and Redirect
            fs.writeFile('message.txt', message, (err) => {
                res.statusCode = 302; // Redirect status
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }
});

server.listen(3000);